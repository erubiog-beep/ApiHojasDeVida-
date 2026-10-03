const mongoose = require('mongoose');
const Experiencia = require('../models/Experiencia');

const CAMPOS = ['persona', 'empresa', 'cargo', 'fechaInicio', 'fechaFin', 'actual', 'descripcion'];

// Solo deja pasar los campos permitidos (evita que lleguen _id, createdAt, etc.)
function filtrar(body) {
  const datos = {};
  CAMPOS.forEach((c) => { if (body[c] !== undefined) datos[c] = body[c]; });
  return datos;
}

function idValido(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// POST /api/experiencias
exports.crear = async (req, res, next) => {
  try {
    const nueva = await Experiencia.create(filtrar(req.body));
    res.status(201).json(nueva);
  } catch (err) { next(err); }
};

// GET /api/experiencias?persona=emuar
exports.listar = async (req, res, next) => {
  try {
    const filtro = {};
    if (req.query.persona) filtro.persona = String(req.query.persona).toLowerCase();
    // Las más recientes primero
    const lista = await Experiencia.find(filtro).sort({ fechaInicio: -1 });
    res.json(lista);
  } catch (err) { next(err); }
};

// GET /api/experiencias/:id
exports.obtener = async (req, res, next) => {
  try {
    if (!idValido(req.params.id)) return res.status(400).json({ error: 'El id no es válido' });
    const exp = await Experiencia.findById(req.params.id);
    if (!exp) return res.status(404).json({ error: 'Experiencia no encontrada' });
    res.json(exp);
  } catch (err) { next(err); }
};

// PUT /api/experiencias/:id  (reemplaza los campos enviados y vuelve a validar)
exports.actualizar = async (req, res, next) => {
  try {
    if (!idValido(req.params.id)) return res.status(400).json({ error: 'El id no es válido' });
    const exp = await Experiencia.findById(req.params.id);
    if (!exp) return res.status(404).json({ error: 'Experiencia no encontrada' });
    exp.set(filtrar(req.body));
    await exp.save(); // se usa save() para que corran las validaciones entre campos
    res.json(exp);
  } catch (err) { next(err); }
};

// DELETE /api/experiencias/:id
exports.eliminar = async (req, res, next) => {
  try {
    if (!idValido(req.params.id)) return res.status(400).json({ error: 'El id no es válido' });
    const exp = await Experiencia.findByIdAndDelete(req.params.id);
    if (!exp) return res.status(404).json({ error: 'Experiencia no encontrada' });
    res.json({ mensaje: 'Experiencia eliminada correctamente', eliminada: exp });
  } catch (err) { next(err); }
};
