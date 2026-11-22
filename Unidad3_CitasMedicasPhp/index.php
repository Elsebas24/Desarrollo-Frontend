<?php
require_once __DIR__ . '/includes/auth.php';

// Si ya inició sesión, directo al dashboard
if (!empty($_SESSION['user_id'])) {
    header('Location: dashboard.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="<?= csrf_token() ?>">
    <title>Iniciar sesión | Citas Médicas</title>
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
                <i class="bi bi-heart-pulse-fill text-primary display-4"></i>
                <h1 class="h4 mt-2">Citas Médicas</h1>
                <p class="text-muted mb-0">Ingresa con tu usuario</p>
            </div>

            <div id="alerta" class="alert alert-danger d-none" role="alert"></div>

            <form id="formLogin" novalidate>
                <div class="mb-3">
                    <label for="usuario" class="form-label">Usuario</label>
                    <input type="text" class="form-control" id="usuario"
                           name="usuario" required autofocus>
                </div>

                <div class="mb-4">
                    <label for="password" class="form-label">Contraseña</label>
                    <input type="password" class="form-control" id="password"
                           name="password" required>
                </div>

                <button type="submit" class="btn btn-primary w-100" id="btnLogin">
                    Entrar
                </button>
            </form>

        </div>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="assets/js/login.js"></script>
</body>
</html>