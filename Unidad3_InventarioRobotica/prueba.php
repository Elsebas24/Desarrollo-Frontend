<?php
require 'includes/funciones.php';

echo 'Total: ' . contarComponentes() . '<br>';
echo 'Sensores: ' . contarComponentes('', 2) . '<br>';
echo 'Inyección: ' . contarComponentes("' OR 1=1 -- ") . '<br>';

foreach (obtenerComponentes('', 0, 'todos', 'precio') as $c) {
    echo e($c['nombre']) . ' · ' . e($c['categoria']) . ' · ' . dinero($c['precio']) . '<br>';
}