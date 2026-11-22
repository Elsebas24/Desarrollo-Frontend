// assets/js/app.js - Interactividad con jQuery
$(function () {

    // 1. Los avisos verdes/rojos se cierran solos a los 4 segundos
    setTimeout(function () {
        $('.auto-cerrar').fadeOut(400);
    }, 4000);


    // 2. Filtros: al cambiar un select se busca solo, sin presionar el botón
    $('.filtro-auto').on('change', function () {
        $('#formFiltros').trigger('submit');
    });


    // 3. Eliminar: el modal muestra el nombre del componente
    if ($('#modalEliminar').length) {
        const modal = new bootstrap.Modal('#modalEliminar');

        $('.btn-eliminar').on('click', function () {
            $('#eliminarId').val($(this).data('id'));
            $('#eliminarNombre').text($(this).data('nombre'));
            modal.show();
        });
    }


    // 4. Validación en el navegador antes de enviar el formulario
    $('#formComponente').on('submit', function (e) {
        let valido = true;

        $(this).find('[required]').each(function () {
            const $campo = $(this);
            const vacio  = String($campo.val()).trim() === '';

            $campo.toggleClass('is-invalid', vacio);

            if (vacio) {
                valido = false;
            }
        });

        const cantidad = Number($('#cantidad').val());

        if (!Number.isInteger(cantidad) || cantidad < 0) {
            $('#cantidad').addClass('is-invalid');
            valido = false;
        }

        if (Number($('#precio').val()) < 0) {
            $('#precio').addClass('is-invalid');
            valido = false;
        }

        if (!valido) {
            e.preventDefault();
            $(this).find('.is-invalid').first().trigger('focus');
        }
    });

    // Al escribir, se quita la marca roja del campo
    $('#formComponente').on('input change', '.is-invalid', function () {
        $(this).removeClass('is-invalid');
    });

});