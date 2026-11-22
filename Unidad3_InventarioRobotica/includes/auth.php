<?php
// includes/auth.php - Sesión, protección de páginas, CSRF y mensajes

require_once __DIR__ . '/db_connect.php';

if (session_status() === PHP_SESSION_NONE) {
    session_set_cookie_params([
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_start();
}

/** Si no hay sesión, manda al login. */
function require_login(): void
{
    if (empty($_SESSION['user_id'])) {
        header('Location: login.php');
        exit;
    }
}

/** Token CSRF de la sesión (se crea la primera vez). */
function csrf_token(): string
{
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }

    return $_SESSION['csrf'];
}

/** Revisa el token que llegó en el formulario. */
function verificar_csrf(): void
{
    $token = $_POST['csrf'] ?? '';

    if (!hash_equals($_SESSION['csrf'] ?? '', $token)) {
        http_response_code(403);
        exit('Token de seguridad inválido. Regresa y recarga la página.');
    }
}

/** Guarda un mensaje para mostrarlo en la siguiente página. */
function flash(string $tipo, string $texto): void
{
    $_SESSION['flash'] = ['tipo' => $tipo, 'texto' => $texto];
}

/** Devuelve el mensaje pendiente (y lo borra). */
function tomar_flash(): ?array
{
    $msg = $_SESSION['flash'] ?? null;
    unset($_SESSION['flash']);

    return $msg;
}