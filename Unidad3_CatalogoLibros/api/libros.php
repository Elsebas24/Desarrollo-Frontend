<?php
// api/libros.php - API REST del catálogo (GET, POST, PUT, DELETE)
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../config/conexion.php';

$method = $_SERVER['REQUEST_METHOD'];

/** Responde en JSON con su código HTTP y termina. */
function responder(array $datos, int $codigo = 200): void
{
    http_response_code($codigo);
    echo json_encode($datos, JSON_UNESCAPED_UNICODE);
    exit;
}

try {

    // ---------- GET: listar y filtrar ----------
    if ($method === 'GET') {
        $q          = trim($_GET['q'] ?? '');
        $categoria  = trim($_GET['categoria'] ?? '');
        $disponible = $_GET['disponible'] ?? '';
        $orden      = $_GET['orden'] ?? '';

        $sql    = "SELECT * FROM libros WHERE 1=1";
        $params = [];

        if ($q !== '') {
            // Con EMULATE_PREPARES = false cada marcador se usa una sola vez
            $sql .= " AND (titulo LIKE :q1 OR autor LIKE :q2 OR isbn LIKE :q3)";
            $params[':q1'] = "%$q%";
            $params[':q2'] = "%$q%";
            $params[':q3'] = "%$q%";
        }

        if ($categoria !== '' && $categoria !== 'Todas') {
            $sql .= " AND categoria = :categoria";
            $params[':categoria'] = $categoria;
        }

        if ($disponible === '1' || $disponible === '0') {
            $sql .= " AND disponible = :disponible";
            $params[':disponible'] = (int) $disponible;
        }

        // Reto A: ordenamiento (solo valores permitidos)
        switch ($orden) {
            case 'anio_desc':
                $sql .= " ORDER BY anio_publicacion DESC, titulo ASC";
                break;
            case 'titulo_asc':
                $sql .= " ORDER BY titulo ASC";
                break;
            default:
                $sql .= " ORDER BY id DESC";
        }

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $libros = $stmt->fetchAll();

        // Reto C: exportar a CSV los libros filtrados
        if (($_GET['formato'] ?? '') === 'csv') {
            header('Content-Type: text/csv; charset=utf-8');
            header('Content-Disposition: attachment; filename="libros.csv"');

            $salida = fopen('php://output', 'w');
            fwrite($salida, "\xEF\xBB\xBF"); // BOM: acentos correctos en Excel

            $columnas = ['ID', 'Título', 'Autor', 'Categoría', 'Año',
                         'ISBN', 'Editorial', 'Páginas', 'Estado'];
            fputcsv($salida, $columnas, ',', '"', '');

            foreach ($libros as $l) {
                fputcsv($salida, [
                    $l['id'], $l['titulo'], $l['autor'], $l['categoria'],
                    $l['anio_publicacion'], $l['isbn'], $l['editorial'],
                    $l['paginas'], $l['disponible'] ? 'Disponible' : 'Prestado',
                ], ',', '"', '');
            }

            fclose($salida);
            exit;
        }

        // Categorías únicas para llenar el selector
        $cats = $pdo->query("SELECT DISTINCT categoria FROM libros ORDER BY categoria ASC")
                    ->fetchAll(PDO::FETCH_COLUMN);

        responder([
            'ok'         => true,
            'total'      => count($libros),
            'categorias' => $cats,
            'data'       => $libros,
        ]);
    }

    $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;

    // ---------- POST: registrar ----------
    if ($method === 'POST') {
        $requeridos = ['titulo', 'autor', 'categoria', 'anio_publicacion',
                       'isbn', 'editorial', 'sinopsis'];

        foreach ($requeridos as $campo) {
            if (trim((string) ($input[$campo] ?? '')) === '') {
                responder(['ok' => false, 'error' => "El campo '$campo' es obligatorio."], 400);
            }
        }

        $anio = (int) $input['anio_publicacion'];

        if ($anio < 1500 || $anio > (int) date('Y') + 1) {
            responder(['ok' => false, 'error' => 'El año de publicación no es válido.'], 400);
        }

        // Reto B: el ISBN no se puede repetir
        $isbn = trim($input['isbn']);
        $stmt = $pdo->prepare("SELECT id FROM libros WHERE isbn = :isbn");
        $stmt->execute([':isbn' => $isbn]);

        if ($stmt->fetch()) {
            responder(['ok' => false, 'error' => "Ya existe un libro con el ISBN $isbn."], 409);
        }

        $stmt = $pdo->prepare(
            "INSERT INTO libros (titulo, autor, categoria, anio_publicacion, isbn,
                                 editorial, paginas, sinopsis, disponible)
             VALUES (:titulo, :autor, :categoria, :anio, :isbn,
                     :editorial, :paginas, :sinopsis, 1)"
        );
        $stmt->execute([
            ':titulo'    => trim($input['titulo']),
            ':autor'     => trim($input['autor']),
            ':categoria' => trim($input['categoria']),
            ':anio'      => $anio,
            ':isbn'      => $isbn,
            ':editorial' => trim($input['editorial']),
            ':paginas'   => max(1, (int) ($input['paginas'] ?? 100)),
            ':sinopsis'  => trim($input['sinopsis']),
        ]);

        responder([
            'ok'      => true,
            'id'      => (int) $pdo->lastInsertId(),
            'mensaje' => 'Libro registrado.',
        ], 201);
    }

    // ---------- PUT: alternar disponibilidad ----------
    if ($method === 'PUT') {
        $id = (int) ($input['id'] ?? 0);

        if ($id <= 0) {
            responder(['ok' => false, 'error' => 'ID inválido.'], 400);
        }

        $stmt = $pdo->prepare("UPDATE libros SET disponible = NOT disponible WHERE id = :id");
        $stmt->execute([':id' => $id]);

        if ($stmt->rowCount() === 0) {
            responder(['ok' => false, 'error' => 'El libro no existe.'], 404);
        }

        responder(['ok' => true, 'mensaje' => 'Disponibilidad actualizada.']);
    }

    // ---------- DELETE: eliminar ----------
    if ($method === 'DELETE') {
        $id = (int) ($_GET['id'] ?? ($input['id'] ?? 0));

        if ($id <= 0) {
            responder(['ok' => false, 'error' => 'ID inválido.'], 400);
        }

        $stmt = $pdo->prepare("DELETE FROM libros WHERE id = :id");
        $stmt->execute([':id' => $id]);

        if ($stmt->rowCount() === 0) {
            responder(['ok' => false, 'error' => 'El libro no existe.'], 404);
        }

        responder(['ok' => true, 'mensaje' => 'Libro eliminado.']);
    }

    responder(['ok' => false, 'error' => 'Método no permitido.'], 405);

} catch (PDOException $e) {
    // 23000: violación de índice único (dos personas guardando el mismo ISBN a la vez)
    if ($e->getCode() === '23000') {
        responder(['ok' => false, 'error' => 'Ese ISBN ya está registrado.'], 409);
    }

    responder(['ok' => false, 'error' => 'Error en la base de datos.'], 500);
}