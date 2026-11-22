<?php
// api/login.php - Valida usuario y contraseña
require_once __DIR__ . '/../includes/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_out(['ok' => false, 'msg' => 'Método no permitido.'], 405);
}

$token = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';

if (!hash_equals($_SESSION['csrf'] ?? '', $token)) {
    json_out([
        'ok'  => false,
        'msg' => 'Token de seguridad inválido. Recarga la página.',
    ], 403);
}

$usuario  = trim($_POST['usuario'] ?? '');
$password = $_POST['password'] ?? '';

if ($usuario === '' || $password === '') {
    json_out(['ok' => false, 'msg' => 'Escribe tu usuario y contraseña.'], 422);
}

$stmt = db()->prepare(
    'SELECT id, nombre, password_hash
       FROM usuarios
      WHERE usuario = ? AND activo = 1'
);
$stmt->execute([$usuario]);
$u = $stmt->fetch();

if (!$u || !password_verify($password, $u['password_hash'])) {
    json_out(['ok' => false, 'msg' => 'Usuario o contraseña incorrectos.'], 401);
}

session_regenerate_id(true); // evita fijación de sesión

$_SESSION['user_id'] = (int) $u['id'];
$_SESSION['nombre']  = $u['nombre'];

json_out(['ok' => true, 'redirect' => 'dashboard.php']);