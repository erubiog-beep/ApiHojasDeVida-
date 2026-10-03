// Carga las experiencias que ya estaban escritas a mano en las hojas de vida.
// Uso: npm run seed   (borra las experiencias existentes y las vuelve a crear)
require('dotenv').config();
const mongoose = require('mongoose');
const conectarDB = require('../src/config/db');
const Experiencia = require('../src/models/Experiencia');

const datos = [
  {
    persona: 'emuar', empresa: 'Juke Coffe', cargo: 'Barista / Atención al cliente',
    fechaInicio: '2025-10-01', fechaFin: '2026-05-31',
    descripcion: 'Experiencia relacionada con atención al cliente, preparación y servicio de bebidas y actividades propias del establecimiento.'
  },
  {
    persona: 'laura', empresa: 'Macarena', cargo: 'Auxiliar de atención al cliente',
    fechaInicio: '2024-01-01', fechaFin: '2024-01-31',
    descripcion: 'Atención directa a clientes en el punto de venta, asesoría sobre productos, manejo de caja y apoyo en la organización e inventario de la mercancía.'
  },
  {
    // OJO: en la unidad 2 este dato era un marcador; reemplazar por el real
    persona: 'fabian', empresa: 'Nombre del restaurante', cargo: 'Mesero / Atención al cliente',
    fechaInicio: '2025-01-01', fechaFin: '2025-01-31',
    descripcion: 'Atención a los comensales, toma de pedidos, recomendación de platos del menú y coordinación con cocina y caja para garantizar un servicio ágil.'
  }
];

(async () => {
  try {
    await conectarDB();
    await Experiencia.deleteMany({});
    const creadas = await Experiencia.insertMany(datos);
    console.log(`🌱 ${creadas.length} experiencias creadas`);
  } catch (e) {
    console.error(e);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();
