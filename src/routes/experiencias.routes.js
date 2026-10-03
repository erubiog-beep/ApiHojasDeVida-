const router = require('express').Router();
const c = require('../controllers/experiencias.controller');

router.route('/')
  .get(c.listar)
  .post(c.crear);

router.route('/:id')
  .get(c.obtener)
  .put(c.actualizar)
  .delete(c.eliminar);

module.exports = router;
