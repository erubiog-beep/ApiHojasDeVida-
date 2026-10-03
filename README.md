# API de Experiencias Profesionales — Unidad 3

CRUD de experiencias profesionales para las hojas de vida del equipo (Emuar, Laura y Fabián).
**Node.js + Express.js + MongoDB (Mongoose)**, documentada y probada con **Swagger** y **Postman**.
Las páginas `experiencia.html` de la unidad 2 ahora leen sus datos de esta API.

## Requisitos
- Node.js 18 o superior
- MongoDB corriendo en local (`mongodb://127.0.0.1:27017`) **o** una base gratuita en MongoDB Atlas

## Puesta en marcha
```bash
npm install
cp .env.example .env     # ya viene un .env; edita MONGODB_URI si usas Atlas
npm run seed             # carga las experiencias que ya tenían las hojas de vida
npm start                # http://localhost:3000
```

| Qué | URL |
|---|---|
| Swagger (probar endpoints) | http://localhost:3000/api-docs |
| Panel para crear/editar/eliminar | http://localhost:3000/admin.html |
| Hoja de vida de Emuar | http://localhost:3000/emuar-hv/index.html |
| Hoja de vida de Laura | http://localhost:3000/laura-hv/index.html |
| Hoja de vida de Fabián | http://localhost:3000/fabian-hv/index.html |

> Las hojas de vida deben abrirse **desde el servidor** (no con doble clic al .html) para que puedan llamar a la API.

## Endpoints
| Método | Ruta | Descripción | Respuestas |
|---|---|---|---|
| POST | `/api/experiencias` | Crear | 201, 400 |
| GET | `/api/experiencias` | Listar (opcional `?persona=emuar\|laura\|fabian`) | 200 |
| GET | `/api/experiencias/:id` | Obtener una | 200, 400, 404 |
| PUT | `/api/experiencias/:id` | Actualizar | 200, 400, 404 |
| DELETE | `/api/experiencias/:id` | Eliminar | 200, 400, 404 |

### Modelo `Experiencia`
| Campo | Tipo | Reglas |
|---|---|---|
| persona | String | obligatorio: `emuar`, `laura` o `fabian` |
| empresa | String | obligatorio, 2–100 caracteres |
| cargo | String | obligatorio, 2–100 caracteres |
| fechaInicio | Date | obligatorio |
| fechaFin | Date | obligatoria si `actual` es false; no puede ser menor que `fechaInicio` |
| actual | Boolean | si es true, `fechaFin` se pone en null |
| descripcion | String | opcional, máx. 600 caracteres |

Ejemplo de cuerpo para POST/PUT:
```json
{
  "persona": "laura",
  "empresa": "Tienda Ejemplo",
  "cargo": "Vendedora",
  "fechaInicio": "2025-02-01",
  "fechaFin": "2025-08-30",
  "actual": false,
  "descripcion": "Atención al cliente y manejo de caja."
}
```

## Cómo probar
- **Swagger:** abre `/api-docs`, despliega un endpoint → *Try it out* → *Execute*.
- **Postman:** *Import* → `docs/postman_collection.json`. Ejecuta las peticiones en orden (la 1 guarda el `id` que usan la 4, 5 y 6) o usa *Run collection*.
- **Script automático:** con el servidor encendido, `npm test`.

## Estructura
```
server.js                 arranque + conexión a MongoDB
src/app.js                Express, Swagger y archivos estáticos
src/models/               esquema Mongoose (validaciones)
src/controllers/          lógica del CRUD
src/routes/               rutas
src/middlewares/errores.js manejo de errores (400, 404, 500)
docs/                     swagger.json y colección de Postman
scripts/                  seed.js y test-api.js
public/                   hojas de vida (unidad 2) + admin.html + shared/experiencias.js
```
