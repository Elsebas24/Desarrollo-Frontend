<?php
// api/medicos.php?especialidad_id=1 - Médicos de una especialidad
require_once __DIR__ . '/../includes/auth.php';
api_guard();

$esp = (int) ($_GET['especialidad_id'] ?? 0);

if ($esp <= 0) {
    json_out(['ok' => true, 'medicos' => []]);
}

$stmt = db()->prepare(
    'SELECT id, nombre
       FROM medicos
      WHERE especialidad_id = ? AND activo = 1
      ORDER BY nombre'
);
$stmt->execute([$esp]);

json_out(['ok' => true, 'medicos' => $stmt->fetchAll()]);