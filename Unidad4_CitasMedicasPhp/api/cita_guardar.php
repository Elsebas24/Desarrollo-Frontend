<?php
// api/cita_guardar.php - Registra (o reutiliza) al paciente y crea la cita
require_once __DIR__ . '/../includes/auth.php';
api_guard(true);

$medicoId = (int) ($_POST['medico_id'] ?? 0);
$fecha    = $_POST['fecha'] ?? '';
$hora     = $_POST['hora'] ?? '';
$nombre   = trim($_POST['nombre'] ?? '');
$telefono = preg_replace('/\D/', '', $_POST['telefono'] ?? '');
$email    = trim($_POST['email'] ?? '');
$motivo   = trim($_POST['motivo'] ?? '');

// ---------- Validaciones ----------
$d = DateTime::createFromFormat('Y-m-d', $fecha);

if (!$d || $d->format('Y-m-d') !== $fecha) {
    json_out(['ok' => false, 'msg' => 'Fecha inválida.'], 422);
}

if (!in_array($hora . ':00', horas_atencion(), true)) {
    json_out(['ok' => false, 'msg' => 'La hora debe estar entre 9:00 y 19:00.'], 422);
}

if (new DateTime("$fecha $hora:00") <= new DateTime()) {
    json_out(['ok' => false, 'msg' => 'No se puede agendar en una hora que ya pasó.'], 422);
}

if ($nombre === '' || mb_strlen($nombre) > 120) {
    json_out(['ok' => false, 'msg' => 'Escribe el nombre del paciente.'], 422);
}

if (strlen($telefono) !== 10) {
    json_out(['ok' => false, 'msg' => 'El teléfono debe tener 10 dígitos.'], 422);
}

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_out(['ok' => false, 'msg' => 'El correo no es válido.'], 422);
}

$pdo = db();

// El médico debe existir; de él sale la especialidad
$stmt = $pdo->prepare(
    'SELECT especialidad_id FROM medicos WHERE id = ? AND activo = 1'
);
$stmt->execute([$medicoId]);
$medico = $stmt->fetch();

if (!$medico) {
    json_out(['ok' => false, 'msg' => 'Médico no encontrado.'], 404);
}

try {
    $pdo->beginTransaction();

    // ¿Ya existe el paciente (por teléfono)? Si no, se crea.
    $stmt = $pdo->prepare('SELECT id FROM pacientes WHERE telefono = ?');
    $stmt->execute([$telefono]);
    $pacienteId = $stmt->fetchColumn();

    if (!$pacienteId) {
        $stmt = $pdo->prepare(
            'INSERT INTO pacientes (nombre, telefono, email) VALUES (?, ?, ?)'
        );
        $stmt->execute([$nombre, $telefono, $email !== '' ? $email : null]);
        $pacienteId = $pdo->lastInsertId();
    }

    $stmt = $pdo->prepare(
        'INSERT INTO citas (paciente_id, medico_id, especialidad_id,
                            fecha, hora, motivo, creado_por)
         VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([
        $pacienteId,
        $medicoId,
        $medico['especialidad_id'],
        $fecha,
        $hora . ':00',
        $motivo !== '' ? $motivo : null,
        $_SESSION['user_id'],
    ]);

    $pdo->commit();

    json_out(['ok' => true, 'msg' => 'Cita agendada correctamente.']);

} catch (PDOException $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    // 23000 = violación de índice único: alguien ya tomó ese horario
    if ($e->getCode() === '23000') {
        json_out([
            'ok'  => false,
            'msg' => 'Ese horario ya fue ocupado. Actualiza la agenda.',
        ], 409);
    }

    json_out(['ok' => false, 'msg' => 'Error al guardar la cita.'], 500);
}