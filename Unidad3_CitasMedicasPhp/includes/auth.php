<?php
// includes/auth.php - Sesión, protección de páginas, CSRF y respuestas JSON

require_once __DIR__ . '/../config/db.php';

if (session_status() === PHP_SESSION_NONE) {
    session_set_cookie_params([
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_start();
}

date_default_timezone_set('America/Monterrey');

/** Token CSRF de la sesión (se crea la primera vez). */
function csrf_token(): string
{
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }

    return $_SESSION['csrf'];
}

/** Para páginas HTML: si no hay sesión, manda al login. */
function require_login(): void
{
    if (empty($_SESSION['user_id'])) {
        header('Location: index.php');
        exit;
    }
}

/** Respuesta JSON y fin del script. */
function json_out(array $data, int $code = 200): void
{
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

/** Para la API: exige sesión y, en POST, el token CSRF. */
function api_guard(bool $post = false): void
{
    if (empty($_SESSION['user_id'])) {
        json_out([
            'ok'  => false,
            'msg' => 'Sesión expirada. Inicia sesión de nuevo.',
        ], 401);
    }

    if ($post) {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            json_out(['ok' => false, 'msg' => 'Método no permitido.'], 405);
        }

        $token = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';

        if (!hash_equals($_SESSION['csrf'] ?? '', $token)) {
            json_out([
                'ok'  => false,
                'msg' => 'Token de seguridad inválido.',
            ], 403);
        }
    }
}

/** Horas de atención: 09:00 a 19:00 (la última cita empieza a las 18:00). */
function horas_atencion(): array
{
    $horas = [];

    for ($h = 9; $h < 19; $h++) {
        $horas[] = sprintf('%02d:00:00', $h);
    }

    return $horas;
}