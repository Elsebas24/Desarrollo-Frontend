<?php
require_once __DIR__ . '/includes/auth.php';
require_login();

// Número de citas agendadas para hoy (dato informativo del módulo)
$stmt = db()->prepare(
    "SELECT COUNT(*)
       FROM citas
      WHERE fecha = CURDATE() AND estado = 'agendada'"
);
$stmt->execute();
$citasHoy = (int) $stmt->fetchColumn();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dashboard | Citas Médicas</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
          rel="stylesheet">
    <link href="assets/css/style.css" rel="stylesheet">
</head>
<body class="bg-light">

<nav class="navbar navbar-dark bg-primary">
    <div class="container">
        <a class="navbar-brand" href="dashboard.php">
            <i class="bi bi-heart-pulse-fill me-2"></i>Citas Médicas
        </a>

        <div class="d-flex align-items-center text-white">
            <span class="me-3 d-none d-sm-inline">
                <i class="bi bi-person-circle me-1"></i>
                <?= htmlspecialchars($_SESSION['nombre']) ?>
            </span>
            <a href="logout.php" class="btn btn-outline-light btn-sm">Salir</a>
        </div>
    </div>
</nav>

<main class="container py-5">
    <h1 class="h3 mb-1">Dashboard</h1>
    <p class="text-muted mb-4">Selecciona un módulo para comenzar.</p>

    <div class="row g-4">

        <!-- Único módulo del sistema -->
        <div class="col-12 col-md-6 col-lg-4">
            <a href="citas.php" class="text-decoration-none">
                <div class="card modulo-card h-100 shadow-sm border-0">
                    <div class="card-body text-center p-4">
                        <i class="bi bi-calendar2-plus display-3 text-primary"></i>
                        <h2 class="h5 mt-3 text-dark">Citas de especialidad</h2>
                        <p class="text-muted mb-2">
                            Ingresar un paciente a una cita médica.
                        </p>
                        <span class="badge text-bg-primary">
                            <?= $citasHoy ?> cita(s) hoy
                        </span>
                    </div>
                </div>
            </a>
        </div>

    </div>
</main>

<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>