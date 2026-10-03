/* Carga las experiencias de una hoja de vida desde la API (GET /api/experiencias?persona=...) */
(function () {
  var contenedor = document.getElementById('lista-experiencias');
  if (!contenedor) return;

  var persona = contenedor.getAttribute('data-persona');
  var MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];

  function esc(t) {
    return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fecha(iso) {
    var d = new Date(iso); // las fechas se guardan en UTC
    var m = MESES[d.getUTCMonth()];
    return m.charAt(0).toUpperCase() + m.slice(1) + ' de ' + d.getUTCFullYear();
  }

  fetch('/api/experiencias?persona=' + encodeURIComponent(persona))
    .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(function (lista) {
      if (!lista.length) {
        contenedor.innerHTML = '<p>Aún no hay experiencias registradas.</p>';
        return;
      }
      contenedor.innerHTML = lista.map(function (e) {
        var fin = e.actual ? 'Actualidad' : fecha(e.fechaFin);
        return '<article>' +
          '<h3>' + esc(e.empresa) + '</h3>' +
          '<p><strong>Cargo:</strong> ' + esc(e.cargo) + '</p>' +
          '<p><strong>Periodo:</strong> ' + fecha(e.fechaInicio) + ' - ' + fin + '</p>' +
          (e.descripcion ? '<p>' + esc(e.descripcion) + '</p>' : '') +
          '</article>';
      }).join('');
    })
    .catch(function () {
      contenedor.innerHTML = '<p>No se pudo cargar la experiencia. Verifica que el servidor esté encendido.</p>';
    });
})();
