<?php
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/funciones.php';
require_login();

$id     = (int) ($_GET['id'] ?? 0);
$actual = obtenerComponente($id);

if ($actual === null) {
    flash('danger', 'El componente no existe.');
    header('Location: index.php');
    exit;
}

$errores = [];

// Carga los datos actuales en el formulario
$d = leerFormulario($actual);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verificar_csrf();

    $d       = leerFormulario($_POST);
    $errores = validarComponente($d);

    if (count($errores) === 0) {
        actualizarComponente($id, $d);

        flash('success', 'Componente "' . $d['nombre'] . '" actualizado.');
        header('Location: index.php');
        exit;
    }
}

$categorias  = obtenerCategorias();
$proveedores = obtenerProveedores();
$textoBoton  = 'Guardar cambios';

$titulo = 'Editar componente';
require __DIR__ . '/includes/header.php';
?>

<h1 class="h3 mb-3">Editar componente</h1>

<?php require __DIR__ . '/includes/form_componente.php'; ?>

<?php require __DIR__ . '/includes/footer.php'; ?>