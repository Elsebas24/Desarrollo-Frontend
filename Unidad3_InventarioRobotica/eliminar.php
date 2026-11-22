<?php
// eliminar.php - Borra un componente (solo por POST desde el modal)
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/funciones.php';
require_login();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.php');
    exit;
}

verificar_csrf();

$id = (int) ($_POST['id'] ?? 0);
$componente = obtenerComponente($id);

if ($componente !== null && eliminarComponente($id)) {
    flash('success', 'Componente "' . $componente['nombre'] . '" eliminado.');
} else {
    flash('danger', 'No se encontró el componente.');
}

header('Location: index.php');
exit;