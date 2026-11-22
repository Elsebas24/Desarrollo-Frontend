<?php
// includes/funciones.php - Funciones propias del inventario

require_once __DIR__ . '/db_connect.php';

const POR_PAGINA = 6;

/** Escapa texto para mostrarlo en HTML (evita XSS). */
function e(?string $texto): string
{
    return htmlspecialchars($texto ?? '', ENT_QUOTES, 'UTF-8');
}

/** Formatea un precio: 1234.5 → $1,234.50 */
function dinero(float $precio): string
{
    return '$' . number_format($precio, 2);
}

function obtenerCategorias(): array
{
    return db()->query('SELECT id, nombre FROM categorias ORDER BY nombre')
               ->fetchAll();
}

function obtenerProveedores(): array
{
    return db()->query('SELECT id, nombre FROM proveedores ORDER BY nombre')
               ->fetchAll();
}

/**
 * Arma el WHERE de la búsqueda y llena $params.
 * Se usa en contarComponentes() y en obtenerComponentes().
 */
function armarFiltros(string $buscar, int $categoria, string $stock, array &$params): string
{
    $where = [];

    if ($buscar !== '') {
        $where[] = '(c.nombre LIKE ? OR c.fabricante LIKE ? OR c.modelo LIKE ?)';
        $like = '%' . $buscar . '%';
        $params[] = $like;
        $params[] = $like;
        $params[] = $like;
    }

    if ($categoria > 0) {
        $where[] = 'c.categoria_id = ?';
        $params[] = $categoria;
    }

    switch ($stock) {
        case 'agotado':
            $where[] = 'c.cantidad = 0';
            break;
        case 'bajo':
            $where[] = 'c.cantidad BETWEEN 1 AND 4';
            break;
        case 'disponible':
            $where[] = 'c.cantidad >= 5';
            break;
        default:
            // 'todos': sin filtro de stock
            break;
    }

    if (count($where) === 0) {
        return '';
    }

    return 'WHERE ' . implode(' AND ', $where);
}

/** Traduce la opción de orden a SQL (solo valores permitidos). */
function ordenSql(string $orden): string
{
    switch ($orden) {
        case 'precio':
            return 'c.precio DESC';
        case 'cantidad':
            return 'c.cantidad ASC';
        case 'reciente':
            return 'c.fecha_compra DESC';
        default:
            return 'c.nombre ASC';
    }
}

function contarComponentes(string $buscar = '', int $categoria = 0, string $stock = 'todos'): int
{
    $params = [];
    $where  = armarFiltros($buscar, $categoria, $stock, $params);

    $stmt = db()->prepare("SELECT COUNT(*) FROM componentes c $where");
    $stmt->execute($params);

    return (int) $stmt->fetchColumn();
}

function obtenerComponentes(
    string $buscar = '',
    int $categoria = 0,
    string $stock = 'todos',
    string $orden = 'nombre',
    int $pagina = 1
): array {
    $params  = [];
    $where   = armarFiltros($buscar, $categoria, $stock, $params);
    $orderBy = ordenSql($orden);
    $offset  = ($pagina - 1) * POR_PAGINA;

    $sql = "SELECT c.*, k.nombre AS categoria, p.nombre AS proveedor
              FROM componentes c
              JOIN categorias k       ON k.id = c.categoria_id
              LEFT JOIN proveedores p ON p.id = c.proveedor_id
              $where
             ORDER BY $orderBy
             LIMIT " . POR_PAGINA . " OFFSET $offset";

    $stmt = db()->prepare($sql);
    $stmt->execute($params);

    return $stmt->fetchAll();
}

function obtenerComponente(int $id): ?array
{
    $stmt = db()->prepare('SELECT * FROM componentes WHERE id = ?');
    $stmt->execute([$id]);
    $fila = $stmt->fetch();

    return $fila ?: null;
}

/** Lee el formulario y lo limpia. */
function leerFormulario(array $post): array
{
    return [
        'nombre'        => trim($post['nombre'] ?? ''),
        'categoria_id'  => (int) ($post['categoria_id'] ?? 0),
        'proveedor_id'  => (int) ($post['proveedor_id'] ?? 0),
        'fabricante'    => trim($post['fabricante'] ?? ''),
        'modelo'        => trim($post['modelo'] ?? ''),
        'cantidad'      => trim($post['cantidad'] ?? ''),
        'precio'        => trim($post['precio'] ?? ''),
        'ubicacion'     => trim($post['ubicacion'] ?? ''),
        'datasheet_url' => trim($post['datasheet_url'] ?? ''),
        'fecha_compra'  => trim($post['fecha_compra'] ?? ''),
    ];
}

/** Valida en el servidor. Regresa un arreglo de errores (vacío = todo bien). */
function validarComponente(array $d): array
{
    $errores = [];

    if ($d['nombre'] === '' || mb_strlen($d['nombre']) > 120) {
        $errores['nombre'] = 'Escribe el nombre (máximo 120 caracteres).';
    }

    if ($d['categoria_id'] <= 0) {
        $errores['categoria_id'] = 'Elige una categoría.';
    }

    if ($d['fabricante'] === '') {
        $errores['fabricante'] = 'Escribe el fabricante.';
    }

    if (filter_var($d['cantidad'], FILTER_VALIDATE_INT,
            ['options' => ['min_range' => 0, 'max_range' => 65535]]) === false) {
        $errores['cantidad'] = 'La cantidad debe ser un número entero de 0 o más.';
    }

    if (!is_numeric($d['precio']) || $d['precio'] < 0) {
        $errores['precio'] = 'El precio debe ser un número de 0 o más.';
    }

    if ($d['datasheet_url'] !== ''
        && !filter_var($d['datasheet_url'], FILTER_VALIDATE_URL)) {
        $errores['datasheet_url'] = 'El enlace del datasheet no es válido.';
    }

    if ($d['fecha_compra'] !== '') {
        $f = DateTime::createFromFormat('Y-m-d', $d['fecha_compra']);

        if (!$f || $f->format('Y-m-d') !== $d['fecha_compra']) {
            $errores['fecha_compra'] = 'La fecha no es válida.';
        }
    }

    return $errores;
}

/** Valores listos para el INSERT/UPDATE (vacíos → NULL). */
function valoresSql(array $d): array
{
    return [
        $d['nombre'],
        $d['categoria_id'],
        $d['proveedor_id'] > 0 ? $d['proveedor_id'] : null,
        $d['fabricante'],
        $d['modelo'] !== '' ? $d['modelo'] : null,
        (int) $d['cantidad'],
        (float) $d['precio'],
        $d['ubicacion'] !== '' ? $d['ubicacion'] : null,
        $d['datasheet_url'] !== '' ? $d['datasheet_url'] : null,
        $d['fecha_compra'] !== '' ? $d['fecha_compra'] : null,
    ];
}

function agregarComponente(array $d): void
{
    $stmt = db()->prepare(
        'INSERT INTO componentes
            (nombre, categoria_id, proveedor_id, fabricante, modelo,
             cantidad, precio, ubicacion, datasheet_url, fecha_compra)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute(valoresSql($d));
}

function actualizarComponente(int $id, array $d): void
{
    $valores   = valoresSql($d);
    $valores[] = $id;

    $stmt = db()->prepare(
        'UPDATE componentes
            SET nombre = ?, categoria_id = ?, proveedor_id = ?, fabricante = ?,
                modelo = ?, cantidad = ?, precio = ?, ubicacion = ?,
                datasheet_url = ?, fecha_compra = ?
          WHERE id = ?'
    );
    $stmt->execute($valores);
}

function eliminarComponente(int $id): bool
{
    $stmt = db()->prepare('DELETE FROM componentes WHERE id = ?');
    $stmt->execute([$id]);

    return $stmt->rowCount() > 0;
}

/** Arma la URL conservando los filtros actuales. */
function urlCon(array $cambios): string
{
    $params = array_merge($_GET, $cambios);

    return 'index.php?' . http_build_query($params);
}

/** Color de la etiqueta según la cantidad. */
function colorStock(int $cantidad): string
{
    if ($cantidad === 0) {
        return 'danger';
    } elseif ($cantidad < 5) {
        return 'warning';
    }

    return 'success';
}