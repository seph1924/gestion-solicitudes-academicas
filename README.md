# Plataforma de Gestión de Solicitudes Académicas — PA4 (Integración, Next.js, Despliegue y Producción)

**Curso:** PROGRAMACIÓN WEB II  
**Código:** 30690  
**Periodo académico:** 202620  
**Evaluación:** PA4 — Proceso de Aprendizaje 4  
**Sesiones evaluadas:** 11 a 13  
**Unidades:** Construcción de Aplicaciones Frontend con React.js · Despliegue y Seguridad en Aplicaciones Web  
**Docente:** WILDER JULIO ESPINOZA BRAVO  
**Fecha:** 24/11/2026
**Video público de YouTube: https://youtu.be/QZ2odHTcRBY**

**URL del frontend desplegado en Vercel:** https://gestion-solicitudes-academicas.vercel.app/solicitudes
---

## 1. Integrantes y participación

| N.º | Integrante | Rol | Participación |
|:---:|---|---|---|
| 1 | **Samuel Pacheco** | Integración de API REST | Conexión del frontend React con la API Node.js mediante Axios, capa de servicios, manejo de errores (`ApiError`), interceptores y validación de respuestas. |
| 2 | **Danny Posadas** | Autenticación JWT | Registro e inicio de sesión, generación y validación de JWT, sesión mediante cookie `httpOnly`, contexto de usuario y rutas protegidas. |
| 3 | **Juan Angel Cáceres Guerra** | Next.js | Proyecto `frontend-nextjs` con SSR, SSG y rutas dinámicas, y justificación técnica de cada estrategia. |
| 4 | **Miguel Villa** | Despliegue en Vercel | Configuración del proyecto en Vercel, despliegue, verificación de rutas y entrega de la URL funcional. |
| 5 | **Josep Palacios** | Preparación para producción | Optimización y minificación del build, configuración de Vite, variables de entorno, logs con niveles y monitoreo básico. |

Todos los integrantes son responsables del resultado final y deben conocer la solución completa presentada.

---

## 2. Descripción del proyecto

La Plataforma de Gestión de Solicitudes Académicas es una aplicación web que permite consultar, registrar y administrar solicitudes de estudiantes, como rectificación de notas, reserva de matrícula, cartas de presentación y exámenes extemporáneos.

En esta cuarta etapa el frontend deja de trabajar con datos simulados: se conecta con una API REST en Node.js y Express respaldada por MongoDB, incorpora autenticación con JWT, evalúa estrategias de renderizado con Next.js, se despliega en Vercel y se prepara para un entorno de producción.

Por el corte de la sesión 13, los contenidos de despliegue del backend (Render, MongoDB Atlas) y de seguridad (HTTPS, XSS/CSRF, Helmet.js, Lighthouse) quedan para la Evaluación Integral.

## 3. Objetivo

Integrar el frontend React con una API REST y sesiones JWT, aplicar SSR, SSG y rutas dinámicas con Next.js, desplegar la aplicación en Vercel y preparar el código para producción mediante optimización del build, variables de entorno, logs y monitoreo.

---

## 4. Estructura del repositorio

| Carpeta | Contenido |
|---|---|
| `frontend-react/` | SPA en React 19 con Vite, Redux Toolkit, React Router y Axios. |
| `frontend-nextjs/` | Proyecto Next.js (App Router) con SSR, SSG y rutas dinámicas. |
| `backend/` | API REST en Node.js, Express y Mongoose. |
| `docs/pa4/` | Documentación técnica de cada integrante. |
| `docs/capturas/` | Evidencias de ejecución y pruebas. |
| `src/` y configuración Angular en la raíz | Entrega de la PA1 (histórico, no se modifica). |

---

## 5. Desarrollo

El trabajo se dividió por responsabilidades y se integró mediante ramas y Pull Requests en el repositorio grupal.

1. **Integración de API REST:** el frontend consume la API con Axios a través de una capa de servicios, con manejo de carga, errores de red, timeout y validación de datos.
2. **Autenticación JWT:** el backend genera un token firmado al iniciar sesión y lo entrega en una cookie `httpOnly`; el frontend mantiene la sesión con un contexto y protege las rutas privadas.
3. **Next.js:** se implementaron vistas con SSR y SSG y una ruta dinámica, justificando cada elección.
4. **Despliegue en Vercel:** se publicó el frontend y se verificaron sus rutas principales.
5. **Preparación para producción:** se optimizó el build, se configuraron variables de entorno y se añadieron logs y monitoreo.

---

## 6. Solución propuesta

### Actividad 1 — Consumo de APIs y sesiones JWT en React

- Capa de datos en tres niveles: `useSolicitudes` (hook) → `solicitudesService.js` (un método por endpoint, con validación de respuesta) → `api.js` (instancia de Axios).
- `ApiError` unifica los errores en cuatro tipos: `RED`, `TIMEOUT`, `HTTP` y `VALIDACION`.
- Rutas de autenticación del backend: `POST /api/usuarios/registro`, `POST /api/usuarios/login`, `GET /api/usuarios/me` y `POST /api/usuarios/logout`.
- Contraseñas con hash `bcryptjs`; token firmado con `jsonwebtoken`.
- La sesión se guarda en una cookie `httpOnly` con `sameSite: 'lax'` y `secure` en producción, de modo que JavaScript del navegador no puede leer el token.
- En React, `UsuarioContext` guarda el usuario autenticado y `ProtectedRoute` redirige a `/login` cuando no hay sesión.

**Rutas del frontend React:**

| Ruta | Vista | Acceso |
|---|---|---|
| `/login` | Inicio de sesión | Pública |
| `/registro` | Registro de usuario | Pública |
| `/` | Página principal | Protegida |
| `/solicitudes` | Gestión de solicitudes | Protegida |
| `/nueva-solicitud` | Registro de una solicitud | Protegida |
| `/resumen` | Resumen de información | Protegida |

### Actividad 2 — Next.js: SSR, SSG y rutas dinámicas

| Ruta | Estrategia | Justificación |
|---|---|---|
| `/solicitudes` | SSR (`connection()`) | El listado se genera en cada petición, porque puede cambiar. |
| `/informacion` | SSG | Contenido estable que se genera una sola vez en la compilación. |
| `/solicitudes/[id]` | Ruta dinámica + `generateStaticParams()` | Genera una página estática por cada solicitud (101 a 104). |

### Actividad 3 — Despliegue del frontend en Vercel

- Frontend desplegado en Vercel: **[PEGAR AQUÍ LA URL DE VERCEL]**
- Rutas verificadas tras el despliegue: **[COMPLETAR]**
- Variables de entorno cargadas en el panel de Vercel: **[COMPLETAR]**

### Actividad 4 — Preparación para producción

**Variables de entorno**

| Archivo | Uso |
|---|---|
| `backend/.env.example` | Plantilla del backend: `PORT`, `NODE_ENV`, `CORS_ORIGIN`, `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `LOG_LEVEL`. |
| `frontend-react/.env.example` | Desarrollo: `VITE_API_URL`, `VITE_LOG_LEVEL`, `VITE_MONITOREO_URL`. |
| `frontend-react/.env.production.example` | Plantilla para producción. En Vercel se cargan desde el panel, no se sube ningún `.env` real. |

En `NODE_ENV=production` el backend se niega a arrancar si faltan `MONGODB_URI`, `CORS_ORIGIN` o `JWT_SECRET`.

**Optimización y minificación (`frontend-react/vite.config.js`)**

- Minificación con esbuild.
- Eliminación de `debugger` y de llamadas sueltas a `console.log`, `console.info` y `console.debug` en el build de producción.
- Separación en chunks (`react`, `router`, `estado`, `http` y código propio) para aprovechar la caché del navegador.
- Constantes de compilación `__APP_VERSION__` y `__BUILD_DATE__`.
- `npm run analyze` genera `stats.html`, un mapa visual del bundle.

| Medición | Antes | Después |
|---|---|---|
| Archivos JavaScript | 1 | 5 |
| Código propio | 363.56 kB (120.19 kB gzip) | [COMPLETAR] kB |
| Total JavaScript | 363.56 kB | [COMPLETAR] kB |

El tamaño total no se reduce, porque React pesa lo mismo. La mejora es la caché: las librerías casi no cambian, así que el navegador no las vuelve a descargar cuando se actualiza el código propio.

**Webpack y Babel.** Este frontend usa Vite, que cumple ese papel: empaqueta con Rollup y transpila con esbuild, y el plugin de React compila el JSX. `manualChunks` equivale al `splitChunks` de Webpack. Next.js utiliza su propio compilador interno.

**Logs**

- Frontend: `utils/logger.js` con niveles `debug`, `info`, `warn`, `error` y `silent`. Por defecto muestra todo en desarrollo y solo `warn` y `error` en producción. Se controla con `VITE_LOG_LEVEL`.
- Backend: `utils/logger.js` y middleware que registra cada petición (método, ruta, código y duración). Usa texto legible en desarrollo y JSON en producción. El nivel de cada registro depende del código: 5xx = `error`, 4xx = `warn`, resto = `info`.

**Monitoreo**

- `ErrorBoundary` captura errores de renderizado de React.
- `utils/monitoreo.js` captura errores globales y promesas rechazadas, y mide el LCP y el tiempo de carga.
- Opcionalmente envía los errores a una URL externa (`VITE_MONITOREO_URL`) con `sendBeacon`.
- `GET /api/health` devuelve el estado de la API: uptime, memoria y conexión con MongoDB (responde 503 si la base de datos no está conectada).
- El backend registra los errores no manejados y cierra de forma ordenada ante `SIGTERM` y `SIGINT`.

---

## 7. Cómo ejecutar o revisar el proyecto

**Requisitos:** Node.js 20 o superior y MongoDB en ejecución en `127.0.0.1:27017`.

**1. Clonar e instalar dependencias**

```bash
git clone https://github.com/seph1924/gestion-solicitudes-academicas.git
cd gestion-solicitudes-academicas
npm install
npm install --prefix frontend-react
npm install --prefix backend
```

**2. Configurar variables de entorno**

```bash
cp backend/.env.example backend/.env
cp frontend-react/.env.example frontend-react/.env
```

Genera la clave del JWT y pégala en `JWT_SECRET` dentro de `backend/.env`:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

No subas los archivos `.env` al repositorio.

**3. Ejecutar frontend React y backend a la vez**

```bash
npm run dev
```

| Servicio | Dirección |
|---|---|
| Frontend React | http://localhost:5173 |
| API | http://localhost:3000/api |
| Health | http://localhost:3000/api/health |

Registra un usuario en `http://localhost:5173/registro` e inicia sesión en `/login`.

**4. Ejecutar el proyecto Next.js**

```bash
cd frontend-nextjs
npm install
npm run dev
```

**5. Revisar la preparación para producción**

```bash
cd frontend-react
npm run lint
npm run build:prod
npm run analyze
```

---

## 8. Evidencias

La documentación técnica detallada está en `docs/pa4/`:

| Documento | Contenido |
|---|---|
| `01-integracion-api-rest.md` | Integración con la API REST. |
| `02-nextjs-ssr-ssg-rutas-dinamicas.md` | Next.js con SSR, SSG y rutas dinámicas. |
| `05-preparacion-produccion.md` | Preparación para producción *(pendiente de añadir)*. |

Capturas de la preparación para producción, en `docs/capturas/pa4/produccion/`:

- Build antes y después de la optimización.
- Mapa del bundle (`stats.html`).
- Logs por petición del backend.
- Respuesta de `/api/health`.
- Error al arrancar en producción con variables faltantes.
- Consola del navegador con logs y métricas.

---

## 9. Conclusiones

- El frontend dejó de depender de datos simulados: ahora consume una API real con manejo uniforme de errores y sesiones seguras con JWT.
- Next.js permite elegir la estrategia de renderizado según la vista: SSR para contenido que cambia y SSG para contenido estable.
- Desplegar en Vercel permite revisar la aplicación fuera del entorno local.
- Preparar la aplicación para producción implica configuración por entorno, un build optimizado, logs con niveles y monitoreo básico. Esto la hace mantenible y permite detectar problemas a tiempo.
- El trabajo se integró mediante ramas y Pull Requests, resolviendo conflictos entre las partes de cada integrante.

---

## 10. Video de exposición

**Video público de YouTube:** [PEGAR AQUÍ EL ENLACE]
