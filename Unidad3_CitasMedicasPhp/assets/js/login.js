// assets/js/login.js
$(function () {

    const csrf = $('meta[name="csrf-token"]').attr('content');

    $('#formLogin').on('submit', function (e) {
        e.preventDefault();

        const $alerta = $('#alerta').addClass('d-none');
        const $btn = $('#btnLogin').prop('disabled', true).text('Entrando...');

        $.ajax({
            url: 'api/login.php',
            method: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            headers: { 'X-CSRF-Token': csrf }
        })
        .done(function (r) {
            window.location.href = r.redirect;
        })
        .fail(function (xhr) {
            const msg = (xhr.responseJSON && xhr.responseJSON.msg)
                     || 'No se pudo conectar con el servidor.';

            $alerta.text(msg).removeClass('d-none');
            $btn.prop('disabled', false).text('Entrar');
        });
    });

});