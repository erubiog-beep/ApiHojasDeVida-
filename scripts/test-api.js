// Prueba el CRUD completo contra el servidor encendido: npm start (en otra terminal) y luego npm test
const BASE = process.env.BASE_URL || 'http://localhost:3000';
const assert = require('assert');

async function llamar(metodo, ruta, body) {
  const r = await fetch(BASE + ruta, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });
  return { status: r.status, data: await r.json() };
}

(async () => {
  const nueva = { persona: 'laura', empresa: 'Empresa de prueba', cargo: 'Tester', fechaInicio: '2025-03-01', fechaFin: '2025-09-01', descripcion: 'Prueba automática' };

  let r = await llamar('POST', '/api/experiencias', nueva);
  assert.strictEqual(r.status, 201); const id = r.data._id;
  console.log('✔ POST   crea (201)');

  r = await llamar('GET', '/api/experiencias?persona=laura');
  assert.strictEqual(r.status, 200); assert.ok(r.data.some((e) => e._id === id));
  console.log('✔ GET    lista y filtra por persona (200)');

  r = await llamar('GET', '/api/experiencias/' + id);
  assert.strictEqual(r.status, 200); assert.strictEqual(r.data.cargo, 'Tester');
  console.log('✔ GET    por id (200)');

  r = await llamar('PUT', '/api/experiencias/' + id, { cargo: 'Tester senior', actual: true });
  assert.strictEqual(r.status, 200); assert.strictEqual(r.data.cargo, 'Tester senior'); assert.strictEqual(r.data.fechaFin, null);
  console.log('✔ PUT    actualiza (200)');

  r = await llamar('POST', '/api/experiencias', { persona: 'laura' });
  assert.strictEqual(r.status, 400);
  console.log('✔ POST   datos inválidos (400)');

  r = await llamar('DELETE', '/api/experiencias/' + id);
  assert.strictEqual(r.status, 200);
  console.log('✔ DELETE elimina (200)');

  r = await llamar('GET', '/api/experiencias/' + id);
  assert.strictEqual(r.status, 404);
  console.log('✔ GET    id eliminado (404)');

  console.log('\n🎉 Todas las pruebas pasaron');
})().catch((e) => { console.error('❌', e.message); process.exit(1); });
