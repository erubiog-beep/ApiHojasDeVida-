$(function () {

  /* --- Animación de aparición al cargar la página (dinamismo con jQuery) --- */
  $(".reveal").each(function (i) {
    var $el = $(this);
    setTimeout(function () {
      $el.addClass("visible");
    }, 150 * i);
  });

  /* --- Efecto en las tarjetas al pasar el mouse --- */
  $(".card").hover(
    function () { $(this).stop().animate({ marginTop: "-4px" }, 150); },
    function () { $(this).stop().animate({ marginTop: "0px" }, 150); }
  );

  /* --- Validación del formulario de contacto --- */
  var $form = $("#form-contacto");
  if ($form.length) {

    var validadores = {
      nombre: function (v) { return v.trim().length >= 3; },
      correo: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
      telefono: function (v) { return /^[0-9\s+\-()]{7,15}$/.test(v.trim()); },
      mensaje: function (v) { return v.trim().length >= 10; }
    };

    var mensajesError = {
      nombre: "Escribe tu nombre completo (mínimo 3 caracteres).",
      correo: "Ingresa un correo electrónico válido.",
      telefono: "Ingresa un número de teléfono válido.",
      mensaje: "El mensaje debe tener al menos 10 caracteres."
    };

    function validarCampo($campo) {
      var nombreCampo = $campo.attr("name");
      var esValido = validadores[nombreCampo]($campo.val() || "");
      $campo.toggleClass("is-invalid", !esValido);
      $campo.siblings(".invalid-feedback").text(esValido ? "" : mensajesError[nombreCampo]);
      return esValido;
    }

    $form.find(".form-control").on("blur input", function () {
      validarCampo($(this));
    });

    $form.on("submit", function (e) {
      e.preventDefault();
      var todoValido = true;

      $form.find(".form-control").each(function () {
        if (!validarCampo($(this))) { todoValido = false; }
      });

      if (!todoValido) {
        $form.find(".is-invalid").first().trigger("focus");
        return;
      }

      /* No hay backend: se simula el envío exitoso y se limpia el formulario */
      $("#exito").stop().slideDown(200);
      $form.trigger("reset");
      $form.find(".form-control").removeClass("is-invalid");

      setTimeout(function () {
        $("#exito").slideUp(300);
      }, 4000);
    });
  }

});
