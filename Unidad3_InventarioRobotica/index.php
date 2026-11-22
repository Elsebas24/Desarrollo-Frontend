<?php
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/funciones.php';
require_login();

// ---------- Cookie: vista lista o tarjetas ----------
if (isset($_GET['vista']) && in_array($_GET['vista'], ['lista', 'tarjetas'], true)) {
    setcookie('vista', $_GET['vista'], time() + 60 * 60 * 24 * 30); // 30 días
    $vista = $_GET['vista'];
} else {
    $vista = $_COOKIE['vista'] ?? 'lista';
}

if ($vista !== 'tarjetas') {
    $vista = 'lista';
}

// ---------- Parámetros GET de búsqueda ----------
$buscar    = trim($_GET['q'] ?? '');
$categoria = (int) ($_GET['categoria'] ?? 0);
$stock     = $_GET['stock'] ?? 'todos';
$orden     = $_GET['orden'] ?? 'nombre';
$pagina    = max(1, (int) ($_GET['pagina'] ?? 1));

$total       = contarComponentes($buscar, $categoria, $stock);
$paginas     = max(1, (int) ceil($total / POR_PAGINA));
$pagina      = min($pagina, $paginas);
$componentes = obtenerComponentes($buscar, $categoria, $stock, $orden, $pagina);
$categorias  = obtenerCategorias();

$titulo = 'Inventario';
require __DIR__ . '/includes/header.php';
?>

<div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
    <h1 class="h3 mb-0">
        Inventario
        <small class="text-muted fs-6"><?= $total ?> componente(s)</small>
    </h1>

    <div class="d-flex gap-2">
        <div class="btn-group" role="group" aria-label="Vista">
            <a href="<?= e(urlCon(['vista' => 'lista'])) ?>"
               class="btn btn-outline-secondary <?= $vista === 'lista' ? 'active' : '' ?>"
               title="Vista de lista">
                <i class="bi bi-list-ul"></i>
            </a>
            <a href="<?= e(urlCon(['vista' => 'tarjetas'])) ?>"
               class="btn btn-outline-secondary <?= $vista === 'tarjetas' ? 'active' : '' ?>"
               title="Vista de tarjetas">
                <i class="bi bi-grid-3x3-gap"></i>
            </a>
        </div>

        <a href="agregar.php" class="btn btn-primary">
            <i class="bi bi-plus-circle me-1"></i>Agregar
        </a>
    </div>
</div>

<!-- Filtros (GET) -->
<form class="card shadow-sm border-0 mb-4" method="get" id="formFiltros">
    <div class="card-body row g-2 align-items-end">

        <div class="col-12 col-md-4">
            <label for="q" class="form-label small">Buscar</label>
            <input type="search" id="q" name="q" class="form-control"
                   placeholder="Nombre, fabricante o modelo" value="<?= e($buscar) ?>">
        </div>

        <div class="col-6 col-md-3">
            <label for="categoria" class="form-label small">Categoría</label>
            <select id="categoria" name="categoria" class="form-select filtro-auto">
                <option value="0">Todas</option>
                <?php foreach ($categorias as $k): ?>
                    <option value="<?= $k['id'] ?>"
                        <?= $k['id'] == $categoria ? 'selected' : '' ?>>
                        <?= e($k['nombre']) ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>

        <div class="col-6 col-md-2">
            <label for="stock" class="form-label small">Stock</label>
            <select id="stock" name="stock" class="form-select filtro-auto">
                <option value="todos"      <?= $stock === 'todos' ? 'selected' : '' ?>>Todos</option>
                <option value="disponible" <?= $stock === 'disponible' ? 'selected' : '' ?>>5 o más</option>
                <option value="bajo"       <?= $stock === 'bajo' ? 'selected' : '' ?>>Bajo (1-4)</option>
                <option value="agotado"    <?= $stock === 'agotado' ? 'selected' : '' ?>>Agotado</option>
            </select>
        </div>

        <div class="col-6 col-md-2">
            <label for="orden" class="form-label small">Ordenar por</label>
            <select id="orden" name="orden" class="form-select filtro-auto">
                <option value="nombre"   <?= $orden === 'nombre' ? 'selected' : '' ?>>Nombre</option>
                <option value="precio"   <?= $orden === 'precio' ? 'selected' : '' ?>>Precio</option>
                <option value="cantidad" <?= $orden === 'cantidad' ? 'selected' : '' ?>>Cantidad</option>
                <option value="reciente" <?= $orden === 'reciente' ? 'selected' : '' ?>>Más reciente</option>
            </select>
        </div>

        <div class="col-6 col-md-1 d-grid">
            <button class="btn btn-dark" type="submit" title="Buscar">
                <i class="bi bi-search"></i>
            </button>
        </div>

    </div>
</form>

<?php if (count($componentes) === 0): ?>

    <div class="alert alert-secondary">
        No se encontraron componentes con esos filtros.
        <a href="index.php" class="alert-link">Ver todos</a>
    </div>

<?php elseif ($vista === 'lista'): ?>

    <div class="card shadow-sm border-0">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                    <tr>
                        <th>Componente</th>
                        <th>Categoría</th>
                        <th class="d-none d-lg-table-cell">Proveedor</th>
                        <th class="text-center">Cantidad</th>
                        <th class="text-end">Precio</th>
                        <th class="d-none d-md-table-cell">Ubicación</th>
                        <th class="text-end">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                <?php foreach ($componentes as $c): ?>
                    <tr>
                        <td>
                            <div class="fw-semibold"><?= e($c['nombre']) ?></div>
                            <div class="small text-muted">
                                <?= e($c['fabricante']) ?> <?= e($c['modelo']) ?>
                            </div>
                        </td>
                        <td><?= e($c['categoria']) ?></td>
                        <td class="d-none d-lg-table-cell"><?= e($c['proveedor'] ?? '—') ?></td>
                        <td class="text-center">
                            <span class="badge text-bg-<?= colorStock((int) $c['cantidad']) ?>">
                                <?= (int) $c['cantidad'] ?>
                            </span>
                        </td>
                        <td class="text-end"><?= dinero((float) $c['precio']) ?></td>
                        <td class="d-none d-md-table-cell"><?= e($c['ubicacion'] ?? '—') ?></td>
                        <td class="text-end text-nowrap">
                            <?php if ($c['datasheet_url']): ?>
                                <a href="<?= e($c['datasheet_url']) ?>" target="_blank"
                                   rel="noopener" class="btn btn-sm btn-outline-secondary"
                                   title="Datasheet"><i class="bi bi-file-earmark-text"></i></a>
                            <?php endif; ?>
                            <a href="editar.php?id=<?= $c['id'] ?>"
                               class="btn btn-sm btn-outline-primary" title="Editar">
                                <i class="bi bi-pencil"></i>
                            </a>
                            <button type="button" class="btn btn-sm btn-outline-danger btn-eliminar"
                                    data-id="<?= $c['id'] ?>" data-nombre="<?= e($c['nombre']) ?>"
                                    title="Eliminar">
                                <i class="bi bi-trash"></i>
                            </button>
                        </td>
                    </tr>
                <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>

<?php else: ?>

    <div class="row g-3">
    <?php foreach ($componentes as $c): ?>
        <div class="col-12 col-sm-6 col-lg-4">
            <div class="card h-100 shadow-sm border-0 componente-card">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <span class="badge text-bg-dark"><?= e($c['categoria']) ?></span>
                        <span class="badge text-bg-<?= colorStock((int) $c['cantidad']) ?>">
                            <?= (int) $c['cantidad'] ?> pzas
                        </span>
                    </div>
                    <h2 class="h6 mb-1"><?= e($c['nombre']) ?></h2>
                    <p class="small text-muted mb-2">
                        <?= e($c['fabricante']) ?> <?= e($c['modelo']) ?>
                    </p>
                    <p class="mb-0 fs-5"><?= dinero((float) $c['precio']) ?></p>
                    <p class="small text-muted mb-0">
                        <i class="bi bi-geo-alt me-1"></i><?= e($c['ubicacion'] ?? 'Sin ubicación') ?>
                        · <?= e($c['proveedor'] ?? 'Sin proveedor') ?>
                    </p>
                </div>
                <div class="card-footer bg-transparent border-0 d-flex gap-2">
                    <a href="editar.php?id=<?= $c['id'] ?>"
                       class="btn btn-sm btn-outline-primary flex-fill">
                        <i class="bi bi-pencil me-1"></i>Editar
                    </a>
                    <button type="button"
                            class="btn btn-sm btn-outline-danger flex-fill btn-eliminar"
                            data-id="<?= $c['id'] ?>" data-nombre="<?= e($c['nombre']) ?>">
                        <i class="bi bi-trash me-1"></i>Eliminar
                    </button>
                </div>
            </div>
        </div>
    <?php endforeach; ?>
    </div>

<?php endif; ?>

<!-- Paginación -->
<?php if ($paginas > 1): ?>
    <nav class="mt-4" aria-label="Páginas">
        <ul class="pagination justify-content-center">
            <li class="page-item <?= $pagina <= 1 ? 'disabled' : '' ?>">
                <a class="page-link" href="<?= e(urlCon(['pagina' => $pagina - 1])) ?>">Anterior</a>
            </li>

            <?php for ($i = 1; $i <= $paginas; $i++): ?>
                <li class="page-item <?= $i === $pagina ? 'active' : '' ?>">
                    <a class="page-link" href="<?= e(urlCon(['pagina' => $i])) ?>"><?= $i ?></a>
                </li>
            <?php endfor; ?>

            <li class="page-item <?= $pagina >= $paginas ? 'disabled' : '' ?>">
                <a class="page-link" href="<?= e(urlCon(['pagina' => $pagina + 1])) ?>">Siguiente</a>
            </li>
        </ul>
    </nav>
<?php endif; ?>

<!-- Modal de confirmación para eliminar -->
<div class="modal fade" id="modalEliminar" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <form class="modal-content" method="post" action="eliminar.php">
            <input type="hidden" name="csrf" value="<?= csrf_token() ?>">
            <input type="hidden" name="id" id="eliminarId">

            <div class="modal-header">
                <h2 class="modal-title h5">Eliminar componente</h2>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                ¿Seguro que quieres eliminar <strong id="eliminarNombre"></strong>?
                Esta acción no se puede deshacer.
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" class="btn btn-danger">Sí, eliminar</button>
            </div>
        </form>
    </div>
</div>

<?php require __DIR__ . '/includes/footer.php'; ?>