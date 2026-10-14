# Plataforma de Gestión de Solicitudes Académicas — PA2 (Backend)

**Curso:** PROGRAMACIÓN WEB II · **Código:** 30690 · **Periodo:** 202620
**Evaluación:** PA2 — Proceso de Aprendizaje 2 (Sesiones 5 a 7: Node.js, Express, MongoDB y autenticación)
**Docente:** WILDER JULIO ESPINOZA BRAVO · **Fecha:** [12/10/2026]


---

## Integrantes y participación

| # | Nombre completo | Rol | Participación |
|---|-----------------|-----|---------------|
| 1 | [Samuel Pacheco] | Servidor Node.js y Express | Configuración de Node.js y Express, servidor HTTP, middleware (JSON, CORS para Angular, logger), rutas principales, variables de entorno y manejo general de errores. |
| 2 | [Danny Posadas] | API REST y CRUD | Endpoints `GET` (listar y por ID), `POST`, `PUT` y `DELETE` de solicitudes, validación de datos recibidos y respuestas de error HTTP. |
| 3 | [Josep Palacios]| Persistencia de datos (MongoDB y Mongoose) | Configuración de MongoDB, conexión con Mongoose, esquema y modelo `Solicitud` con validaciones, servicio con las operaciones de guardar, consultar, actualizar y eliminar, manejo de errores de Mongoose y verificación de la persistencia tras reiniciar el servidor. |
| 4 | [Juan Caceres] | Integración con Angular | Servicio Angular con `HttpClient`, conexión del formulario con `POST`, listado con `GET`, actualización y eliminación desde la interfaz, y manejo de errores y mensajes. |
| 5 | [Miguel Villafuerte] | Pruebas, integración final y documentación | Pruebas de endpoints con herramienta HTTP, verificación de casos correctos y de error, comprobación de persistencia, integración de ramas de Git, evidencias y README. |

Todos los integrantes conocen la solución completa y participaron en la revisión final.

---

## Descripción

API backend para la plataforma de gestión de solicitudes académicas (rectificación de nota, reserva de
matrícula, carta de presentación y examen extemporáneo). En esta segunda etapa se reemplazan los datos de
prueba del frontend Angular de la PA1 por una API construida con **Node.js y Express**, que guarda la
información en **MongoDB** mediante **Mongoose**.

## Objetivo

Construir un servidor HTTP organizado con rutas, middleware y operaciones CRUD, y conectarlo a una base de
datos MongoDB para que las solicitudes persistan entre ejecuciones del servidor, dejando el backend listo
para ser consumido por el frontend Angular.

---

## Desarrollo

El trabajo se repartió por responsabilidades y se integró mediante ramas y Pull Requests sobre el mismo
repositorio.

1. **Base del servidor.** Se configuró Node.js y Express separando la configuración de la aplicación
   (`app.js`) del arranque (`server.js`), con middleware, variables de entorno y manejo centralizado de
   errores.
2. **Persistencia.** Se conectó el backend con MongoDB usando Mongoose, se definió el modelo `Solicitud` a
   partir de la interfaz `SolicitudAcademica` del frontend y se creó un servicio con las operaciones de base
   de datos.
3. **API REST.** Se implementaron los endpoints CRUD que usan ese servicio, con validación de datos y
   códigos HTTP adecuados.
4. **Integración con Angular.** El frontend de la PA1 pasó a consumir esta API en lugar de datos ficticios.
5. **Pruebas e integración final.** Se probaron los endpoints (casos correctos y de error), se comprobó la
   persistencia reiniciando el servidor y se integraron las ramas.

---

## Solución propuesta

### Actividad 1 — Servidor HTTP, rutas, middleware y CRUD

- **Express** expone la API bajo el prefijo `/api`.
- **Middleware:** `express.json()` para leer el cuerpo de las peticiones, **CORS** configurado para el
  servidor de desarrollo de Angular (`http://localhost:4200`), un **logger** de solicitudes, un manejador
  de rutas inexistentes (404 en JSON) y un **manejador centralizado de errores**.
- **Variables de entorno** con `dotenv`, centralizadas en `config/env.js`. El archivo `.env` no se sube al
  repositorio; se incluye `.env.example` como plantilla.

**Endpoints**

| Método | Ruta | Descripción | Respuesta esperada |
|--------|------|-------------|--------------------|
| GET | `/api/health` | Estado del servidor | 200 |
| GET | `/api/solicitudes` | Lista todas las solicitudes | 200 + arreglo |
| GET | `/api/solicitudes/:id` | Obtiene una solicitud por ID | 200, 404 si no existe, 400 si el ID es inválido |
| POST | `/api/solicitudes` | Registra una solicitud | 201, 400 si los datos no son válidos |
| PUT | `/api/solicitudes/:id` | Actualiza una solicitud | 200, 404, 400 |
| DELETE | `/api/solicitudes/:id` | Elimina una solicitud | 200 o 204, 404 |

### Actividad 2 — Persistencia con MongoDB y Mongoose

- **Conexión** (`config/db.js`): `mongoose.connect()` con la URI leída desde `env.js`. El servidor HTTP
  solo se levanta **después** de conectar con la base de datos; si MongoDB no está disponible, el servidor
  no arranca y muestra el error.
- **Modelo `Solicitud`** (`models/Solicitud.js`), alineado con la interfaz de Angular:

  | Campo | Tipo | Reglas |
  |-------|------|--------|
  | `codigoEstudiante` | String | Obligatorio |
  | `nombreEstudiante` | String | Obligatorio, mínimo 3 caracteres |
  | `tipoSolicitud` | String | Obligatorio; solo `Rectificación de Nota`, `Reserva de Matrícula`, `Carta de Presentación`, `Examen Extemporáneo` |
  | `motivo` | String | Obligatorio, máximo 500 caracteres |
  | `estado` | String | `PENDIENTE` (por defecto), `EN_PROCESO`, `APROBADO`, `RECHAZADO` |
  | `fechaCreacion` / `fechaActualizacion` | Date | Generadas automáticamente (`timestamps`) |

- **Servicio** (`services/solicitud.service.js`): `crear`, `listar`, `obtenerPorId`, `actualizar` y
  `eliminar`. La actualización usa `new: true` y `runValidators: true` para devolver el documento
  modificado y aplicar las reglas del esquema también al editar. Si un método devuelve `null`, el
  controlador responde 404.
- **Errores de Mongoose** (`middlewares/errorHandler.js`): `ValidationError` y `CastError` responden 400;
  una clave duplicada (código 11000) responde 409.
- **Nota para el frontend:** MongoDB identifica cada documento con `_id` (texto), por lo que la interfaz
  de Angular usa `_id: string` en lugar de `id: number`.

---

## Cómo ejecutar o revisar

**Requisitos:** Node.js LTS, npm y **MongoDB Community Server** corriendo en `127.0.0.1:27017`
(opcional: MongoDB Compass para ver los datos).

```bash
# 1. Clonar el repositorio
git clone https://github.com/seph1924/gestion-solicitudes-academicas.git
cd gestion-solicitudes-academicas/backend

# 2. Crear el archivo de variables de entorno
copy .env.example .env        # Mac/Linux: cp .env.example .env

# 3. Instalar dependencias
npm install

# 4. Levantar el servidor
npm run dev
```

En consola debe aparecer:

```
MongoDB conectado: 127.0.0.1/gestion_solicitudes
Servidor escuchando en http://localhost:3000 (development)
```

La base `gestion_solicitudes` se crea automáticamente al guardar el primer documento.

**Variables de entorno (`.env.example`)**

```
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:4200
MONGODB_URI=mongodb://127.0.0.1:27017/gestion_solicitudes
```

**Recorrido sugerido para la revisión**

1. `GET http://localhost:3000/api/health` — el servidor responde.
2. `POST /api/solicitudes` con un JSON válido — responde 201 con `_id`.
3. `POST /api/solicitudes` con campos faltantes — responde 400 con los mensajes de validación.
4. `GET /api/solicitudes` — lista las solicitudes guardadas.
5. `PUT` y `DELETE` sobre un `_id` — se reflejan en la base.
6. **Persistencia:** detener el servidor (`Ctrl + C`), volver a iniciarlo con `npm run dev` y repetir el
   `GET`: los datos siguen guardados.
7. Verificar los documentos en Compass: base `gestion_solicitudes` → colección `solicitudes`.

Ejemplo de cuerpo para `POST`:

```json
{
  "codigoEstudiante": "2024001",
  "nombreEstudiante": "Juan Pérez",
  "tipoSolicitud": "Reserva de Matrícula",
  "motivo": "Motivos personales"
}
```

---

## Estructura del proyecto

```
backend/
├── src/
│   ├── config/
│   │   ├── env.js                 # Variables de entorno centralizadas
│   │   └── db.js                  # Conexión a MongoDB con Mongoose
│   ├── models/
│   │   └── Solicitud.js           # Esquema y modelo Mongoose
│   ├── services/
│   │   └── solicitud.service.js   # Operaciones de base de datos
│   ├── controllers/               # Lógica de los endpoints CRUD
│   ├── routes/                    # Rutas bajo /api
│   ├── middlewares/               # logger, notFound, errorHandler
│   ├── app.js                     # Configuración de Express
│   └── server.js                  # Arranque: conecta a MongoDB y levanta el servidor
├── .env.example
├── .gitignore
└── package.json
docs/
└── capturas/                      # Evidencias de ejecución
```

---

## Evidencias

> Las capturas están en la carpeta `docs/capturas/` del repositorio.

| # | Evidencia | Archivo |
|---|-----------|---------|
| 1 | Consola con "MongoDB conectado" y servidor escuchando | `docs/capturas/01-consola-conexion.png` |
| 2 | Compass: base `gestion_solicitudes` y documento guardado | `docs/capturas/02-compass-documento.png` |
| 3 | Persistencia entre ejecuciones (`Documentos guardados: 1`) | `docs/capturas/03-persistencia.png` |
| 4 | `POST` exitoso (201) | `docs/capturas/04-post.png` |
| 5 | `GET` de la lista | `docs/capturas/05-get.png` |
| 6 | `PUT` y `DELETE` reflejados en la base | `docs/capturas/06-put-delete.png` |
| 7 | Error de validación (400) | `docs/capturas/07-error-400.png` |
| 8 | `GET` después de reiniciar el servidor | `docs/capturas/08-persistencia-api.png` |
| 9 | Frontend Angular conectado a la API | `docs/capturas/09-angular.png` |

---

## Conclusiones

- **La persistencia cambió la naturaleza de la aplicación:** con MongoDB y Mongoose las solicitudes se
  conservan entre ejecuciones del servidor, algo que no era posible con los datos de prueba de la PA1.
- **El esquema actúa como primera barrera de validación:** los campos obligatorios, los `enum` y los
  límites de longitud impiden guardar datos inconsistentes, y `runValidators` mantiene esas reglas al
  actualizar.
- **Separar conexión, modelo y servicio facilitó el trabajo en equipo:** cada integrante pudo trabajar su
  parte sin pisar el código de los demás, y los controladores no dependen de detalles de Mongoose.
- **Centralizar la configuración y los errores** (`env.js` y `errorHandler`) permitió que toda la API
  responda con el mismo formato y que no se publiquen credenciales en el repositorio.
- **El identificador `_id` de MongoDB exige coordinar el modelo del frontend:** acordar el contrato de
  datos con el equipo de Angular evitó retrabajo en la integración.
- **Coordinar las ramas y probar la integración completa** (incluyendo reiniciar el servidor) fue tan
  importante como cada módulo por separado.

---

## Video de exposición
