# PA4 · Actividad 1 (parte 1): Integración de API REST con React

**Responsable:** Integrante 1, Integración de API REST
**Alcance:** conectar el frontend React (`frontend-react/`) con la API Node.js/Express (`backend/`) usando **Axios**, gestionar respuestas y errores, y validar los datos que se envían y que se reciben.

> La autenticación JWT y las rutas privadas le corresponden al Integrante 2. Esta capa ya trae los puntos de conexión para su trabajo (ver sección 6).

---

## 1. Qué cambió respecto a la PA3

| PA3 | PA4 |
|---|---|
| Las solicitudes eran un arreglo simulado en `src/data/solicitudes.js` | Las solicitudes se leen y se guardan en MongoDB a través de la API |
| Los cambios se perdían al recargar la página | Los cambios se guardan en la base de datos |
| No había errores de red ni de servidor que manejar | Se manejan los estados de carga, error, timeout, servidor caído y validación |

## 2. Arquitectura de la capa de datos

```
Componentes / páginas (App.jsx, HomePage.jsx)
        │  usan
        ▼
Hook useSolicitudes()          → estado: solicitudes, cargando, error, enProceso
        │  llama a
        ▼
services/solicitudesService.js → una función por endpoint + validación de respuesta
        │  usa
        ▼
services/api.js (Axios)        → baseURL, timeout, interceptores, ApiError
        │  HTTP
        ▼
backend Express /api/solicitudes → MongoDB
```

Cada capa tiene una sola responsabilidad. Los componentes no conocen URLs ni Axios, y si mañana cambia el backend solo se toca la capa de servicios.

## 3. Endpoints consumidos

| Operación en la interfaz | Método y ruta | Función del servicio |
|---|---|---|
| Cargar el listado (Inicio, Solicitudes, Resumen) | `GET /api/solicitudes` | `listarSolicitudes()` |
| Ver una solicitud | `GET /api/solicitudes/:id` | `obtenerSolicitud(id)` |
| Registrar una solicitud (formulario) | `POST /api/solicitudes` | `crearSolicitud(datos)` |
| Cambiar el estado (selector de la tarjeta) | `PATCH /api/solicitudes/:id` | `actualizarEstadoSolicitud(id, estado)` |
| Eliminar (botón de la tarjeta) | `DELETE /api/solicitudes/:id` | `eliminarSolicitud(id)` |

## 4. Manejo de errores

`src/services/api.js` crea **una sola instancia de Axios** (`axios.create`) con `baseURL` y `timeout: 8000`. Su **interceptor de respuesta** convierte cualquier fallo en un `ApiError` con la misma forma:

| Situación | `tipo` | Mensaje que ve el usuario |
|---|---|---|
| El servidor no responde en 8 s | `TIMEOUT` | "El servidor tardó demasiado en responder…" |
| API apagada, sin conexión o bloqueo de CORS | `RED` | "No se pudo conectar con el servidor…" |
| Respuesta 4xx / 5xx | `HTTP` | El `mensaje` que envía el backend, o uno por defecto según el código |
| La respuesta no tiene el formato esperado | `VALIDACION` | "El servidor devolvió una respuesta con un formato inesperado." |

En la interfaz:
- **`EstadoPeticion`** muestra un indicador de carga mientras se piden los datos y, si falla, un mensaje con el botón **Reintentar**.
- **`Aviso`** muestra el resultado de cada operación (éxito o error), incluida la lista de errores de validación que devuelve el backend.
- Mientras una tarjeta tiene una operación en curso, sus controles se deshabilitan para evitar envíos dobles.
- Si una operación devuelve **404** (otra persona ya eliminó la solicitud), la tarjeta se retira de la lista.

### Ajuste en el backend
Antes los controladores respondían `400 { mensaje: "Solicitud validation failed: …" }`, que es el texto crudo de Mongoose. Ahora delegan con `next(error)` al `errorHandler` que ya existía, y este responde de forma uniforme:

```json
{ "ok": false, "mensaje": "Datos no válidos",
  "errores": ["El nombre debe tener al menos 3 caracteres", "Tipo de solicitud no válido"] }
```

También se habilitó **CORS** para varios orígenes (`CORS_ORIGIN` separado por comas), para que la API acepte a Angular (`:4200`) y a React/Vite (`:5173`).

## 5. Validaciones

**Antes de enviar** (`validarFormularioSolicitud` en `src/utils/validaciones.js`): se replican las reglas del modelo Mongoose y el error se muestra debajo de cada campo (`aria-invalid` y `aria-describedby`):
- código obligatorio, con formato `U` + 8 dígitos
- nombre obligatorio, de al menos 3 caracteres
- tipo de solicitud dentro del catálogo
- motivo obligatorio, de máximo 500 caracteres (con contador)

**Al recibir** (`esSolicitudValida` y `normalizarSolicitud`):
- se comprueba que la respuesta sea un arreglo (en el listado) o un objeto con `_id`, campos de texto y un `estado` válido
- los elementos con formato inválido se descartan y se registra una advertencia en consola
- se adapta `_id` (MongoDB) a `id` (formato que usan los componentes)
- en `POST` se exige el código `201 Created`, y en `DELETE`, `ok: true`

La validación del cliente mejora la experiencia de uso, pero **no reemplaza** la del servidor: el backend sigue validando con Mongoose.

## 6. Puntos de conexión para el Integrante 2 (JWT)

`api.js` exporta dos funciones para que el módulo de sesión se conecte sin modificar los servicios:

```js
import { registrarProveedorToken, registrarManejadorNoAutorizado } from './services/api';

registrarProveedorToken(() => tokenActual);           // agrega Authorization: Bearer <token>
registrarManejadorNoAutorizado(() => cerrarSesion());  // se ejecuta ante una respuesta 401
```

## 7. Cómo ejecutar y probar

Requisitos: Node.js 22+ y MongoDB local en `127.0.0.1:27017`.

```bash
# 1) Backend
cd backend
cp .env.example .env
npm install
npm run seed      # carga 6 solicitudes de ejemplo
npm run dev       # API en http://localhost:3000/api

# 2) Frontend (otra terminal)
cd frontend-react
cp .env.example .env
npm install
npm run dev       # http://localhost:5173
```

### Casos de prueba (evidencias para capturas o video)

| # | Prueba | Resultado esperado |
|---|---|---|
| 1 | Abrir `/solicitudes` con la API encendida | Listado cargado desde MongoDB (6 solicitudes del seed) |
| 2 | Registrar una solicitud válida | Aviso verde; aparece en el listado y sigue ahí después de recargar (F5) |
| 3 | Enviar el formulario vacío o con código `X` | Errores debajo de cada campo; no se envía ninguna petición |
| 4 | Cambiar el estado desde una tarjeta | `PATCH` en la pestaña Network; el badge cambia y se mantiene tras recargar |
| 5 | Eliminar una solicitud | Confirmación, aviso verde y la tarjeta desaparece |
| 6 | Detener el backend y pulsar **Actualizar** | Mensaje "No se pudo conectar con el servidor…" con **Reintentar** |
| 7 | Volver a encender el backend y pulsar **Reintentar** | El listado vuelve a cargar |
| 8 | `curl -X POST` con datos inválidos | `400` con `{ ok:false, mensaje, errores:[…] }` |

En modo desarrollo, la consola del navegador registra cada petición (`[API] -> GET …`, `[API] <- 200 …`), lo que sirve como evidencia de la comunicación.

Las capturas se guardan en `docs/capturas/pa4/`.

### Pruebas ejecutadas contra la API (resultados reales)

```
GET  /api/solicitudes            con Origin :5173 → 200, Access-Control-Allow-Origin: http://localhost:5173
POST /api/solicitudes (inválido)                  → 400 {"ok":false,"mensaje":"Datos no válidos","errores":["El nombre debe tener al menos 3 caracteres","Tipo de solicitud no válido","El motivo es obligatorio"]}
GET  /api/solicitudes/123                         → 400 {"ok":false,"mensaje":"El ID proporcionado no es válido"}
GET  /api/solicitudes/64b000000000000000000000    → 404 {"ok":false,"mensaje":"Solicitud no encontrada"}
POST /api/solicitudes (JSON mal formado)          → 400 {"ok":false,"mensaje":"El cuerpo de la solicitud no es un JSON válido"}
```

## 8. Archivos de esta parte

**Nuevos**
- `frontend-react/src/services/api.js`: instancia de Axios, interceptores y `ApiError`
- `frontend-react/src/services/solicitudesService.js`: funciones CRUD y validación de respuestas
- `frontend-react/src/utils/validaciones.js`: validación del formulario y de las respuestas
- `frontend-react/src/components/ui/EstadoPeticion.jsx`: carga, error y reintento
- `frontend-react/src/components/ui/Aviso.jsx`: resultado de las operaciones
- `frontend-react/.env.example`: `VITE_API_URL`
- `backend/src/seed.js` (`npm run seed`): datos de ejemplo

**Modificados**
- `frontend-react/src/hooks/useSolicitudes.js`: de datos simulados a la API
- `frontend-react/src/App.jsx` y `pages/HomePage.jsx`: estados de carga y error, validación, PATCH y DELETE
- `frontend-react/src/data/solicitudes.js`: solo catálogos (se retiraron los datos simulados)
- `frontend-react/src/components/ui/ui.css`: estilos de carga, avisos y errores de campo
- `frontend-react/.gitignore`: ignora los archivos `.env`
- `backend/src/controllers/solicitud.controller.js`: errores delegados a `errorHandler`
- `backend/src/config/env.js`, `backend/.env.example` y `backend/src/app.js`: CORS para varios orígenes
- `backend/package.json`: script `seed`
