<?php
// api/agenda.php?fecha=2026-11-22&medico_id=1
// Devuelve los 10 horarios del día (9:00 a 18:00) con su estado
require_once __DIR__ . '/../includes/auth.php';
api_guard();

$fecha  = $_GET['fecha'] ?? '';
$medico = (int) ($_GET['medico_id'] ?? 0);

$d = DateTime::createFromFormat('Y-m-d', $fecha);

if (!$d || $d->format('Y-m-d') !== $fecha || $medico <= 0) {
    json_out(['ok' => false, 'msg' => 'Fecha o médico inválidos.'], 422);
}

// Citas agendadas de ese médico en esa fecha
$stmt = db()->prepare(
    "SELECT c.id, c.hora, c.motivo, p.nombre AS paciente, p.telefono
       FROM citas c
       JOIN pacientes p ON p.id = c.paciente_id
      WHERE c.medico_id = ? AND c.fecha = ? AND c.estado = 'agendada'"
);
$stmt->execute([$medico, $fecha]);

$porHora = [];

foreach ($stmt->fetchAll() as $c) {
    $porHora[$c['hora']] = $c;
}

$ahora = new DateTime();
$slots = [];

foreach (horas_atencion() as $hora) {
    $slot = [
        'hora' => substr($hora, 0, 5),
        'fin'  => sprintf('%02d:00', (int) substr($hora, 0, 2) + 1),
    ];

    if (isset($porHora[$hora])) {
        $slot['estado'] = 'ocupada';
        $slot['cita']   = $porHora[$hora];
    } elseif (new DateTime("$fecha $hora") <= $ahora) {
        $slot['estado'] = 'pasada'; // no se puede agendar en el pasado
    } else {
        $slot['estado'] = 'libre';
    }

    $slots[] = $slot;
}

json_out(['ok' => true, 'slots' => $slots]);