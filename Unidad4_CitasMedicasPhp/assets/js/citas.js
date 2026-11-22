// assets/js/citas.js - Agenda de citas con jQuery
$(function () {

    const csrf  = $('meta[name="csrf-token"]').attr('content');
    const modal = new bootstrap.Modal('#modalCita');
    const toast = new bootstrap.Toast('#toastMsg', { delay: 3500 });

    // Todas las peticiones llevan el token CSRF
    $.ajaxSetup({ headers: { 'X-CSRF-Token': csrf } });


    // ---------- Utilidades ----------

    function aviso(texto, ok = true) {
        $('#toastMsg')
            .removeClass('text-bg-success text-bg-danger')
            .addClass(ok ? 'text-bg-success' : 'text-bg-danger');

        $('#toastTexto').text(texto);
        toast.show();
    }

    function esc(t) { // evita inyectar HTML desde los datos
        return $('<div>').text(t == null ? '' : t).html();
    }

    function errorMsg(xhr) {
        if (xhr.status === 401) {
            window.location.href = 'index.php';
        }

        return (xhr.responseJSON && xhr.responseJSON.msg)
            || 'Error de conexión.';
    }


    // ---------- Filtros ----------

    $('#especialidad').on('change', function () {
        const id = $(this).val();

        const $med = $('#medico')
            .prop('disabled', true)
            .html('<option value="">Cargando...</option>');

        $('#agenda').html(
            '<div class="col-12 text-muted">Elige un médico para ver la agenda.</div>'
        );

        if (!id) {
            $med.html('<option value="">Primero elige una especialidad</option>');
            return;
        }

        $.getJSON('api/medicos.php', { especialidad_id: id })
            .done(function (r) {
                let html = '<option value="">Selecciona...</option>';

                r.medicos.forEach(function (m) {
                    html += `<option value="${m.id}">${esc(m.nombre)}</option>`;
                });

                $med.html(html).prop('disabled', false);
            })
            .fail(xhr => aviso(errorMsg(xhr), false));
    });

    $('#medico, #fecha').on('change', cargarAgenda);


    // ---------- Dibujar la agenda ----------

    function cargarAgenda() {
        const fecha  = $('#fecha').val();
        const medico = $('#medico').val();

        if (!fecha || !medico) {
            return;
        }

        $('#agenda').html('<div class="col-12 text-muted">Cargando...</div>');

        $.getJSON('api/agenda.php', { fecha: fecha, medico_id: medico })
            .done(function (r) {
                let html = '';

                r.slots.forEach(function (s) {
                    html += '<div class="col-12 col-sm-6 col-lg-4 col-xl-3">'
                          + tarjeta(s)
                          + '</div>';
                });

                $('#agenda').html(html);
            })
            .fail(function (xhr) {
                $('#agenda').html('');
                aviso(errorMsg(xhr), false);
            });
    }

    function tarjeta(s) {
        const rango = `${s.hora} - ${s.fin}`;

        if (s.estado === 'ocupada') {
            return `
            <div class="card slot slot-ocupada h-100 border-danger">
                <div class="card-header bg-danger text-white d-flex justify-content-between">
                    <strong>${rango}</strong>
                    <span class="badge bg-light text-danger">Ocupada</span>
                </div>
                <div class="card-body">
                    <div class="fw-semibold">
                        <i class="bi bi-person me-1"></i>${esc(s.cita.paciente)}
                    </div>
                    <div class="small text-muted">
                        <i class="bi bi-telephone me-1"></i>${esc(s.cita.telefono)}
                    </div>
                    <div class="small mt-1">
                        ${esc(s.cita.motivo) || '<em class="text-muted">Sin motivo</em>'}
                    </div>
                </div>
                <div class="card-footer bg-transparent border-0 pt-0">
                    <button class="btn btn-outline-danger btn-sm w-100 btn-cancelar"
                            data-id="${s.cita.id}">
                        <i class="bi bi-x-circle me-1"></i>Cancelar cita
                    </button>
                </div>
            </div>`;
        }

        if (s.estado === 'pasada') {
            return `
            <div class="card slot slot-pasada h-100 border-secondary">
                <div class="card-header bg-secondary text-white d-flex justify-content-between">
                    <strong>${rango}</strong>
                    <span class="badge bg-light text-secondary">No disponible</span>
                </div>
                <div class="card-body text-muted small">Horario que ya pasó.</div>
            </div>`;
        }

        return `
            <div class="card slot slot-libre h-100 border-success">
                <div class="card-header bg-success text-white d-flex justify-content-between">
                    <strong>${rango}</strong>
                    <span class="badge bg-light text-success">Libre</span>
                </div>
                <div class="card-body d-flex align-items-center justify-content-center">
                    <button class="btn btn-success btn-nueva" data-hora="${s.hora}">
                        <i class="bi bi-plus-circle me-1"></i>Agregar cita
                    </button>
                </div>
            </div>`;
    }


    // ---------- Abrir el modal para una hora libre ----------

    $('#agenda').on('click', '.btn-nueva', function () {
        const hora  = $(this).data('hora');
        const fecha = $('#fecha').val();

        $('#formCita')[0].reset();
        $('#alertaModal').addClass('d-none');

        $('#citaMedico').val($('#medico').val());
        $('#citaFecha').val(fecha);
        $('#citaHora').val(hora);

        $('#resMedico').text(
            $('#medico option:selected').text() + ' · '
            + $('#especialidad option:selected').text()
        );
        $('#resFecha').text(fecha.split('-').reverse().join('/'));
        $('#resHora').text(hora + ' h');

        modal.show();
    });


    // ---------- Guardar ----------

    $('#formCita').on('submit', function (e) {
        e.preventDefault();

        const $alerta = $('#alertaModal').addClass('d-none');
        const $btn = $('#btnGuardar').prop('disabled', true).text('Guardando...');

        $.post('api/cita_guardar.php', {
            medico_id: $('#citaMedico').val(),
            fecha:     $('#citaFecha').val(),
            hora:      $('#citaHora').val(),
            nombre:    $('#pNombre').val(),
            telefono:  $('#pTelefono').val(),
            email:     $('#pEmail').val(),
            motivo:    $('#pMotivo').val()
        }, null, 'json')
            .done(function (r) {
                modal.hide();
                aviso(r.msg);
                cargarAgenda();
            })
            .fail(function (xhr) {
                $alerta.text(errorMsg(xhr)).removeClass('d-none');

                if (xhr.status === 409) {
                    cargarAgenda();
                }
            })
            .always(function () {
                $btn.prop('disabled', false).text('Guardar cita');
            });
    });


    // ---------- Cancelar ----------

    $('#agenda').on('click', '.btn-cancelar', function () {
        if (!confirm('¿Cancelar esta cita?')) {
            return;
        }

        $.post('api/cita_cancelar.php', { id: $(this).data('id') }, null, 'json')
            .done(function (r) {
                aviso(r.msg);
                cargarAgenda();
            })
            .fail(xhr => aviso(errorMsg(xhr), false));
    });

});