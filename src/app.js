const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');

const swaggerDoc = require('../docs/swagger.json');
const experienciasRoutes = require('./routes/experiencias.routes');
const { noEncontrada, manejador } = require('./middlewares/errores');

const app = express();

app.use(cors());
app.use(express.json());

// Documentación y pruebas de los endpoints con Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// API
app.get('/api', (req, res) => res.json({ mensaje: 'API de experiencias profesionales', docs: '/api-docs' }));
app.use('/api/experiencias', experienciasRoutes);
app.use('/api', noEncontrada);

// Hojas de vida (frontend de la unidad 2) servidas por el mismo servidor
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(manejador);

module.exports = app;
