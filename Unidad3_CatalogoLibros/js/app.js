// js/app.js - Interactividad asíncrona con jQuery
$(document).ready(function () {

    const API_URL = 'api/libros.php';
    let librosCache = [];
    let timerBusqueda = null;

    /** Convierte texto en HTML seguro (evita XSS). */
    function escaparHtml(texto) {
        return $('<div>').text(texto ?? '').html();
    }

    /** Filtros actuales de la pantalla. */
    function filtrosActuales() {
        return {
            q: $('#busqueda').val().trim(),
            categoria: $('#filtroCategoria').val(),
            disponible: $('#filtroDisponible').val(),
            orden: $('#filtroOrden').val()
        };
    }


    // ---------- Cargar y dibujar ----------

    function cargarLibros() {
        $.ajax({
            url: API_URL,
            method: 'GET',
            data: filtrosActuales(),
            dataType: 'json',
            success: function (res) {
                if (!res.ok) {
                    return;
                }

                librosCache = res.data;
                poblarCategorias(res.categorias);
                renderizarCatalogo(res.data);
                $('#contadorResultados').text(`Mostrando ${res.total} libro(s)`);
            },
            error: function () {
                $('#contadorResultados').text('Error al consultar el catálogo.');
            }
        });
    }

    function poblarCategorias(categorias) {
        const select = $('#filtroCategoria');
        const seleccionActual = select.val();

        select.find('option:not(:first)').remove();

        categorias.forEach(cat => {
            select.append(`<option value="${escaparHtml(cat)}">${escaparHtml(cat)}</option>`);
        });

        if (categorias.includes(seleccionActual)) {
            select.val(seleccionActual);
        }
    }

    function renderizarCatalogo(libros) {
        const grid = $('#catalogoGrid');
        grid.empty();

        if (libros.length === 0) {
            grid.html('<div class="empty-state">No se encontraron libros con los filtros aplicados.</div>');
            return;
        }

        libros.forEach(libro => {
            const disponible = Number(libro.disponible) === 1;
            const badgeClass = disponible ? 'ok' : 'off';
            const badgeText  = disponible ? 'Disponible' : 'Prestado';
            const toggleText = disponible ? 'Marcar prestado' : 'Marcar disponible';

            const card = `
                <article class="book-card">
                    <div>
                        <div class="book-header">
                            <span class="book-cat">${escaparHtml(libro.categoria)}</span>
                            <span class="badge ${badgeClass}">${badgeText}</span>
                        </div>
                        <h3 class="book-title">${escaparHtml(libro.titulo)}</h3>
                        <p class="book-author">
                            ${escaparHtml(libro.autor)} (${escaparHtml(String(libro.anio_publicacion))})
                        </p>
                        <p class="book-meta">
                            Editorial: ${escaparHtml(libro.editorial)} · ISBN: ${escaparHtml(libro.isbn)}
                        </p>
                    </div>
                    <div class="book-actions">
                        <button class="btn btn-secondary btn-sm btn-detalle" data-id="${libro.id}">Sinopsis</button>
                        <button class="btn btn-primary btn-sm btn-toggle" data-id="${libro.id}">${toggleText}</button>
                        <button class="btn btn-danger btn-sm btn-eliminar" data-id="${libro.id}">Eliminar</button>
                    </div>
                </article>`;

            grid.append(card);
        });
    }


    // ---------- Filtros ----------

    // Debounce: espera 300 ms después de la última tecla antes de buscar
    $('#busqueda').on('input', function () {
        clearTimeout(timerBusqueda);
        timerBusqueda = setTimeout(cargarLibros, 300);
    });

    $('#filtroCategoria, #filtroDisponible, #filtroOrden').on('change', cargarLibros);

    // Reto C: descarga el CSV con los mismos filtros de la pantalla
    $('#btnExportar').on('click', function () {
        const params = $.param({ ...filtrosActuales(), formato: 'csv' });
        window.location.href = `${API_URL}?${params}`;
    });


    // ---------- Modales ----------

    $('#btnAbrirModal').on('click', function () {
        $('#errorForm').addClass('hidden');
        $('#modalLibro').removeClass('hidden');
    });

    $('[data-close]').on('click', function () {
        $('#' + $(this).data('close')).addClass('hidden');
    });


    // ---------- Registrar (POST) ----------

    $('#formLibro').on('submit', function (e) {
        e.preventDefault();

        const datos = {};
        $(this).serializeArray().forEach(item => { datos[item.name] = item.value; });

        $.ajax({
            url: API_URL,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(datos),
            dataType: 'json',
            success: function () {
                $('#formLibro')[0].reset();
                $('#modalLibro').addClass('hidden');
                cargarLibros();
            },
            error: function (xhr) {
                // Reto B: aquí llega el 409 del ISBN repetido
                const msg = xhr.responseJSON?.error || 'No se pudo guardar el libro.';
                $('#errorForm').text(msg).removeClass('hidden');
            }
        });
    });


    // ---------- Sinopsis ----------

    $(document).on('click', '.btn-detalle', function () {
        const id = Number($(this).data('id'));
        const libro = librosCache.find(l => Number(l.id) === id);

        if (!libro) {
            return;
        }

        $('#detalleTitulo').text(libro.titulo);
        $('#detalleMeta').text(
            `${libro.autor} · ${libro.editorial} (${libro.anio_publicacion}) · ${libro.paginas} págs.`
        );
        $('#detalleSinopsis').text(libro.sinopsis);
        $('#modalDetalle').removeClass('hidden');
    });


    // ---------- Cambiar disponibilidad (PUT) ----------

    $(document).on('click', '.btn-toggle', function () {
        const id = $(this).data('id');

        $.ajax({
            url: API_URL,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ id }),
            success: cargarLibros
        });
    });


    // ---------- Eliminar (DELETE) ----------

    $(document).on('click', '.btn-eliminar', function () {
        const id = $(this).data('id');

        if (!confirm('¿Desea eliminar este libro del catálogo?')) {
            return;
        }

        $.ajax({
            url: `${API_URL}?id=${id}`,
            method: 'DELETE',
            success: cargarLibros
        });
    });


    cargarLibros();
});