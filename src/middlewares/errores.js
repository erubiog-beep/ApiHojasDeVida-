// 404 para rutas /api que no existen
exports.noEncontrada = (req, res) => {
  res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
};

// Manejador central de errores
exports.manejador = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (err.name === 'ValidationError') {
    const detalles = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ error: 'Datos inválidos', detalles });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ error: `Valor inválido para "${err.path}"` });
  }
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'El cuerpo de la petición no es un JSON válido' });
  }
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
};
