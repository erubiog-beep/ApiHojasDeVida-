const mongoose = require('mongoose');

async function conectarDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hojas_de_vida';
  await mongoose.connect(uri);
  console.log('✅ Conectado a MongoDB:', mongoose.connection.name);
}

module.exports = conectarDB;
