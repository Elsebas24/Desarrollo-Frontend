<?php
// api/cita_cancelar.php - Cancela una cita (libera el horario)
require_once __DIR__ . '/../includes/auth.php';
api_guard(true);

$id = (int) ($_POST['id'] ?? 0);

if ($id <= 0) {
    json_out(['ok' => false, 'msg' => 'Cita inválida.'], 422);
}

$stmt = db()->prepare(
    "UPDATE citas SET estado = 'cancelada'
      WHERE id = ? AND estado = 'agendada'"
);
$stmt->execute([$id]);

if ($stmt->rowCount() === 0) {
    json_out([
        'ok'  => false,
        'msg' => 'La cita no existe o ya estaba cancelada.',
    ], 404);
}

json_out(['ok' => true, 'msg' => 'Cita cancelada.']);