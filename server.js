require('dotenv').config();
const app = require('./src/app');
const conectarDB = require('./src/config/db');

const PORT = process.env.PORT || 3000;

conectarDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor en http://localhost:${PORT}`);
      console.log(`📘 Swagger:   http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('❌ No se pudo conectar a MongoDB:', err.message);
    process.exit(1);
  });
