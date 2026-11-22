<?php
// includes/form_componente.php - Formulario compartido por agregar.php y editar.php
// Necesita: $d (valores), $errores, $categorias, $proveedores, $textoBoton

/** Clase de Bootstrap si el campo tiene error. */
function claseError(array $errores, string $campo): string
{
    return isset($errores[$campo]) ? 'is-invalid' : '';
}

/** Mensaje de error del campo (si hay). */
function msgError(array $errores, string $campo): string
{
    if (!isset($errores[$campo])) {
        return '';
    }

    return '<div class="invalid-feedback">' . e($errores[$campo]) . '</div>';
}
?>
<form method="post" class="card shadow-sm border-0" id="formComponente" novalidate>
    <input type="hidden" name="csrf" value="<?= csrf_token() ?>">

    <div class="card-body row g-3">

        <div class="col-12 col-md-8">
            <label for="nombre" class="form-label">Nombre *</label>
            <input type="text" id="nombre" name="nombre" maxlength="120" required
                   class="form-control <?= claseError($errores, 'nombre') ?>"
                   value="<?= e($d['nombre']) ?>">
            <?= msgError($errores, 'nombre') ?>
        </div>

        <div class="col-12 col-md-4">
            <label for="categoria_id" class="form-label">Categoría *</label>
            <select id="categoria_id" name="categoria_id" required
                    class="form-select <?= claseError($errores, 'categoria_id') ?>">
                <option value="">Selecciona...</option>
                <?php foreach ($categorias as $k): ?>
                    <option value="<?= $k['id'] ?>"
                        <?= $k['id'] == $d['categoria_id'] ? 'selected' : '' ?>>
                        <?= e($k['nombre']) ?>
                    </option>
                <?php endforeach; ?>
            </select>
            <?= msgError($errores, 'categoria_id') ?>
        </div>

        <div class="col-12 col-md-4">
            <label for="fabricante" class="form-label">Fabricante *</label>
            <input type="text" id="fabricante" name="fabricante" maxlength="80" required
                   class="form-control <?= claseError($errores, 'fabricante') ?>"
                   value="<?= e($d['fabricante']) ?>">
            <?= msgError($errores, 'fabricante') ?>
        </div>

        <div class="col-12 col-md-4">
            <label for="modelo" class="form-label">Modelo</label>
            <input type="text" id="modelo" name="modelo" maxlength="80"
                   class="form-control" value="<?= e($d['modelo']) ?>">
        </div>

        <div class="col-12 col-md-4">
            <label for="proveedor_id" class="form-label">Proveedor</label>
            <select id="proveedor_id" name="proveedor_id" class="form-select">
                <option value="0">Sin proveedor</option>
                <?php foreach ($proveedores as $p): ?>
                    <option value="<?= $p['id'] ?>"
                        <?= $p['id'] == $d['proveedor_id'] ? 'selected' : '' ?>>
                        <?= e($p['nombre']) ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>

        <div class="col-6 col-md-3">
            <label for="cantidad" class="form-label">Cantidad *</label>
            <input type="number" id="cantidad" name="cantidad" min="0" max="65535" step="1"
                   required class="form-control <?= claseError($errores, 'cantidad') ?>"
                   value="<?= e((string) $d['cantidad']) ?>">
            <?= msgError($errores, 'cantidad') ?>
        </div>

        <div class="col-6 col-md-3">
            <label for="precio" class="form-label">Precio (MXN) *</label>
            <input type="number" id="precio" name="precio" min="0" step="0.01"
                   required class="form-control <?= claseError($errores, 'precio') ?>"
                   value="<?= e((string) $d['precio']) ?>">
            <?= msgError($errores, 'precio') ?>
        </div>

        <div class="col-6 col-md-3">
            <label for="ubicacion" class="form-label">Ubicación</label>
            <input type="text" id="ubicacion" name="ubicacion" maxlength="60"
                   placeholder="Gaveta A1" class="form-control"
                   value="<?= e($d['ubicacion']) ?>">
        </div>

        <div class="col-6 col-md-3">
            <label for="fecha_compra" class="form-label">Fecha de compra</label>
            <input type="date" id="fecha_compra" name="fecha_compra"
                   class="form-control <?= claseError($errores, 'fecha_compra') ?>"
                   value="<?= e($d['fecha_compra']) ?>">
            <?= msgError($errores, 'fecha_compra') ?>
        </div>

        <div class="col-12">
            <label for="datasheet_url" class="form-label">Enlace del datasheet</label>
            <input type="url" id="datasheet_url" name="datasheet_url" maxlength="255"
                   placeholder="https://..."
                   class="form-control <?= claseError($errores, 'datasheet_url') ?>"
                   value="<?= e($d['datasheet_url']) ?>">
            <?= msgError($errores, 'datasheet_url') ?>
        </div>

    </div>

    <div class="card-footer bg-transparent d-flex justify-content-end gap-2">
        <a href="index.php" class="btn btn-light">Cancelar</a>
        <button type="submit" class="btn btn-primary"><?= e($textoBoton) ?></button>
    </div>
</form>