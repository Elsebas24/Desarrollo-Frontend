<?php
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/funciones.php';

// Si ya inició sesión, directo al inventario
if (!empty($_SESSION['user_id'])) {
    header('Location: index.php');
    exit;
}

$error   = '';
$usuario = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verificar_csrf();

    $usuario  = trim($_POST['usuario'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($usuario === '' || $password === '') {
        $error = 'Escribe tu usuario y contraseña.';
    } else {
        $stmt = db()->prepare(
            'SELECT id, nombre, password_hash FROM usuarios WHERE usuario = ?'
        );
        $stmt->execute([$usuario]);
        $u = $stmt->fetch();

        if ($u && password_verify($password, $u['password_hash'])) {
            session_regenerate_id(true); // evita fijación de sesión

            $_SESSION['user_id'] = (int) $u['id'];
            $_SESSION['nombre']  = $u['nombre'];

            flash('success', 'Bienvenido, ' . $u['nombre'] . '.');
            header('Location: index.php');
            exit;
        }

        $error = 'Usuario o contraseña incorrectos.';
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Iniciar sesión | Inventario de robótica</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
          rel="stylesheet">
    <link href="assets/css/style.css" rel="stylesheet">
</head>
<body class="login-bg">

<div class="container min-vh-100 d-flex align-items-center justify-content-center">
    <div class="card shadow-lg border-0 login-card">
        <div class="card-body p-4 p-md-5">

            <div class="text-center mb-4">
                <i class="bi bi-robot text-primary display-4"></i>
                <h1 class="h4 mt-2">Inventario de robótica</h1>
                <p class="text-muted mb-0">Ingresa con tu usuario</p>
            </div>

            <?php if ($error !== ''): ?>
                <div class="alert alert-danger"><?= e($error) ?></div>
            <?php endif; ?>

            <form method="post" novalidate>
                <input type="hidden" name="csrf" value="<?= csrf_token() ?>">

                <div class="mb-3">
                    <label for="usuario" class="form-label">Usuario</label>
                    <input type="text" class="form-control" id="usuario" name="usuario"
                           value="<?= e($usuario) ?>" required autofocus>
                </div>

                <div class="mb-4">
                    <label for="password" class="form-label">Contraseña</label>
                    <input type="password" class="form-control" id="password"
                           name="password" required>
                </div>

                <button type="submit" class="btn btn-primary w-100">Entrar</button>
            </form>

        </div>
    </div>
</div>

</body>
</html>