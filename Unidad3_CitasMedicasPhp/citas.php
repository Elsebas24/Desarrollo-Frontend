<?php
require_once __DIR__ . '/includes/auth.php';
require_login();

$especialidades = db()
    ->query('SELECT id, nombre FROM especialidades ORDER BY nombre')
    ->fetchAll();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="<?= csrf_token() ?>">
    <title>Citas | Citas Médicas</title>
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
            <i class="bi bi-arrow-left-circle me-2"></i>Dashboard
        </a>

        <div class="d-flex align-items-center text-white">
            <span class="me-3 d-none d-sm-inline">
                <?= htmlspecialchars($_SESSION['nombre']) ?>
            </span>
            <a href="logout.php" class="btn btn-outline-light btn-sm">Salir</a>
        </div>
    </div>
</nav>

<main class="container py-4">
    <h1 class="h3 mb-3">
        Agenda de citas
        <small class="text-muted fs-6">Horario: 9:00 a 19:00 h</small>
    </h1>

    <!-- Filtros -->
    <div class="card shadow-sm border-0 mb-4">
        <div class="card-body">
            <div class="row g-3">

                <div class="col-12 col-md-3">
                    <label for="fecha" class="form-label">Fecha</label>
                    <input type="date" id="fecha" class="form-control"
                           value="<?= date('Y-m-d') ?>">
                </div>

                <div class="col-12 col-md-4">
                    <label for="especialidad" class="form-label">Especialidad</label>
                    <select id="especialidad" class="form-select">
                        <option value="">Selecciona...</option>
                        <?php foreach ($especialidades as $e): ?>
                            <option value="<?= $e['id'] ?>">
                                <?= htmlspecialchars($e['nombre']) ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="col-12 col-md-5">
                    <label for="medico" class="form-label">Médico</label>
                    <select id="medico" class="form-select" disabled>
                        <option value="">Primero elige una especialidad</option>
                    </select>
                </div>

            </div>
        </div>
    </div>

    <!-- Leyenda -->
    <div class="mb-3 small">
        <span class="badge text-bg-success me-1">Libre</span>
        <span class="badge text-bg-danger me-1">Ocupada</span>
        <span class="badge text-bg-secondary">No disponible</span>
    </div>

    <!-- Aquí jQuery dibuja las tarjetas de horarios -->
    <div id="agenda" class="row g-3">
        <div class="col-12 text-muted">
            Elige fecha, especialidad y médico para ver la agenda.
        </div>
    </div>
</main>

<!-- Modal: nueva cita -->
<div class="modal fade" id="modalCita" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <form class="modal-content" id="formCita" novalidate>

            <div class="modal-header">
                <h2 class="modal-title h5">Nueva cita</h2>
                <button type="button" class="btn-close"
                        data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>

            <div class="modal-body">
                <div id="alertaModal" class="alert alert-danger d-none"></div>

                <p class="mb-3">
                    <i class="bi bi-person-badge me-1"></i>
                    <strong id="resMedico"></strong><br>
                    <i class="bi bi-calendar-event me-1"></i>
                    <span id="resFecha"></span>
                    &nbsp;<i class="bi bi-clock me-1"></i>
                    <span id="resHora"></span>
                </p>

                <input type="hidden" id="citaMedico">
                <input type="hidden" id="citaFecha">
                <input type="hidden" id="citaHora">

                <div class="mb-3">
                    <label for="pNombre" class="form-label">Nombre del paciente *</label>
                    <input type="text" id="pNombre" class="form-control"
                           maxlength="120" required>
                </div>

                <div class="mb-3">
                    <label for="pTelefono" class="form-label">Teléfono (10 dígitos) *</label>
                    <input type="tel" id="pTelefono" class="form-control"
                           maxlength="10" pattern="[0-9]{10}" required>
                </div>

                <div class="mb-3">
                    <label for="pEmail" class="form-label">Correo (opcional)</label>
                    <input type="email" id="pEmail" class="form-control" maxlength="120">
                </div>

                <div class="mb-3">
                    <label for="pMotivo" class="form-label">Motivo de la consulta</label>
                    <textarea id="pMotivo" class="form-control"
                              rows="2" maxlength="255"></textarea>
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-light" data-bs-dismiss="modal">
                    Cancelar
                </button>
                <button type="submit" class="btn btn-primary" id="btnGuardar">
                    Guardar cita
                </button>
            </div>

        </form>
    </div>
</div>

<!-- Contenedor de avisos (toast) -->
<div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div id="toastMsg" class="toast align-items-center border-0" role="alert">
        <div class="d-flex">
            <div class="toast-body" id="toastTexto"></div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto"
                    data-bs-dismiss="toast"></button>
        </div>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="assets/js/citas.js"></script>
</body>
</html>