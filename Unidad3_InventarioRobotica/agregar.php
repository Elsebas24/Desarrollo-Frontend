<?php
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/funciones.php';
require_login();

$errores = [];

// Valores iniciales del formulario vacío
$d = leerFormulario([]);
$d['cantidad'] = '1';
$d['precio']   = '0';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verificar_csrf();

    $d       = leerFormulario($_POST);
    $errores = validarComponente($d);

    if (count($errores) === 0) {
        agregarComponente($d);

        flash('success', 'Componente "' . $d['nombre'] . '" agregado correctamente.');
        header('Location: index.php');
        exit;
    }
}

$categorias  = obtenerCategorias();
$proveedores = obtenerProveedores();
$textoBoton  = 'Guardar componente';

$titulo = 'Agregar componente';
require __DIR__ . '/includes/header.php';
?>

<h1 class="h3 mb-3">Agregar componente</h1>

<?php require __DIR__ . '/includes/form_componente.php'; ?>

<?php require __DIR__ . '/includes/footer.php'; ?>