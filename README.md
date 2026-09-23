# Plataforma de Gestión de Solicitudes Académicas — PA1

**Curso:** PROGRAMACIÓN WEB II · **Código:** 30690 · **Periodo:** 202620
**Evaluación:** PA1 — Proceso de Aprendizaje 1 (Sesiones 1 a 4) · **Ponderación:** 15%
**Docente:** WILDER JULIO ESPINOZA BRAVO · **Fecha:** 22 DE SEPTIEMBRE 2026

**Video público de YouTube:** https://www.youtube.com/watch?v=9sY_BqzZnpw
**Capturas de pantalla de solución: https://drive.google.com/drive/folders/1-oZWopQ94TOUHaV6HZl7bC8OWf-NwUzW?usp=sharing
---

## Integrantes y participación

| # | Nombre completo | Rol | Participación |
|---|-----------------|-----|---------------|
| 1 | Josep Palacios | Configuración del repositorio y modelos | Setup del proyecto Angular y definición inicial de `models/solicitud.model.ts` |
| 2 | Danny Posadas (`dposadas08`) | Arquitectura de componentes | Actividad 2: `SolicitudService`, `ListaSolicitudesComponent` y `NavbarComponent` |
| 3 | Samuel Pacheco | Base tipada, formularios y API REST | Actividad 1: `utils/`; Actividad 3: `SolicitudFormComponent` y rutas; Actividad 4: `SolicitudApiService` y `EstudiantesApiComponent` |
| 4 | [Juan Cáceres] | [Búsqueda y filtrado de solicitudes] | [Desarrollo de un componente Angular independiente para buscar solicitudes por nombre o código y filtrarlas por estado, utilizando data binding, directivas, TypeScript/ES6+ y RouterModule.] |
| 5 | Miguel Villafuerte | Diseño de Interfaz y Maquetación Frontend | Refactorización de vistas de usuario (`ListaSolicitudesComponent` y `SolicitudFormComponent`), modularización de estilos en archivos CSS desacoplados, maquetación del formulario en grid a dos columnas y binding dinámico de clases con `[ngClass]`. |

Todos los integrantes conocen la solución completa y participaron en la revisión final.

---

## Descripción

Frontend Angular tipado para una plataforma de gestión de solicitudes académicas. En esta primera
etapa permite **registrar, navegar y visualizar** información de solicitudes (rectificación de nota,
reserva de matrícula, carta de presentación y examen extemporáneo), sin implementar todavía el
backend de Node.js, que corresponde a las sesiones 5 a 7.

## Objetivo

Demostrar dominio de JavaScript moderno y TypeScript, componentes en Angular 16, formularios
reactivos con navegación, y consumo de una API REST con HttpClient, manteniendo una solución
modular y justificando las decisiones técnicas.

---

## Desarrollo

El trabajo se repartió por actividades y se integró mediante ramas y Pull Requests sobre un mismo
repositorio.

1. **Base del repositorio.** Se generó el proyecto con Angular CLI 16.2.16 y se definieron los
   modelos del caso (`SolicitudAcademica`, `TipoSolicitud`, `EstadoSolicitud`). Angular 16 requiere
   Node 16.14+ o 18.10+, por lo que el equipo trabajó sobre Node 18 LTS.
2. **Interfaz y servicio.** Sobre esos modelos se construyó el servicio inyectable con datos de
   prueba, el listado de solicitudes y la barra de navegación (rama `feature/ui-lista-solicitudes`).
3. **Utilidades tipadas.** Se extrajeron a `utils/` las funciones puras y las reglas de validación,
   para no duplicar lógica entre el listado, el formulario y la vista de la API.
4. **Registro y navegación.** Se añadió el formulario reactivo reutilizando esas validaciones, y se
   configuraron las rutas con `RouterModule` usando los mismos nombres que ya enlazaba el navbar.
5. **Consumo remoto.** Se agregó un segundo servicio con `HttpClient` que adapta la respuesta de una
   API pública al modelo del caso.
6. **Integración.** Cada rama se verificó con `ng build` antes de abrir su Pull Request, y las
   actividades posteriores se construyeron sobre la rama de la Actividad 2 para evitar conflictos en
   `app.module.ts` y en el servicio compartido.

---

## Solución propuesta

### Actividad 1 — Base tipada y modular

**Estructura**

```
src/app/
├── models/
│   ├── solicitud.model.ts         # interfaces y enums del caso
│   └── solicitud-api.model.ts     # forma cruda de la API externa
└── utils/
    ├── helpers.ts                 # funciones puras
    └── validaciones.ts            # reglas de validación reutilizables
```

**Qué se hizo y por qué**

- `SolicitudAcademica` se definió como **interfaz**, porque es la entidad del caso, y los estados y
  tipos como **enums de TypeScript** (`EstadoSolicitud`, `TipoSolicitud`) en lugar de `string`, para
  que el compilador rechace valores inválidos antes de ejecutar.
- Se separó `models` de `utils` para que componentes y servicios importen los tipos sin duplicarlos.
- Se usaron **funciones puras**: `cambiarEstado` y `contarPorEstado` devuelven objetos nuevos con
  *spread* en vez de modificar los originales, así una función no cambia datos sin que se note.
- `Record<EstadoSolicitud, string>` obliga a cubrir todos los estados al escribir sus etiquetas: si
  se agrega uno nuevo, TypeScript avisa que falta.
- Las validaciones viven en `validaciones.ts` para que el formulario reactivo de la Actividad 3 las
  reutilice en lugar de reescribirlas.
- **Recursos ES6+ utilizados:** arrow functions, destructuring, spread, template literals, parámetros
  por defecto, `map`, `filter`, `find`, `reduce` y módulos `import`/`export`; de TypeScript, `Omit`,
  `Record` y enums.

### Actividad 2 — Arquitectura de componentes Angular

**Estructura**

```
src/app/
├── services/
│   └── solicitud.service.ts
└── components/
    ├── lista-solicitudes/
    └── navbar/
```

**Qué se hizo y por qué**

- **Inyección de dependencias:** el servicio usa `@Injectable({ providedIn: 'root' })` para estar
  disponible en toda la aplicación sin declararlo en el módulo, y se inyecta en el constructor del
  componente. Así el servicio maneja los datos y el componente solo los pinta.
- **Directivas estructurales:** la tabla se construye con `*ngFor` y los casos vacíos con `*ngIf`. Se
  usó la sintaxis tradicional (`*ngFor="let item of lista"`) y no el nuevo control de flujo `@for`,
  porque esa sintaxis no está soportada en Angular 16.
- **Data binding:** interpolación (`{{ solicitud.nombreEstudiante }}`) para las celdas y property
  binding con `[ngClass]` para colorear el estado.
- El servicio devuelve **copias** del arreglo (`[...this.solicitudes]`) para que los componentes no
  modifiquen su estado interno.
- El `NavbarComponent` concentra la navegación, de modo que ninguna vista repite los enlaces.

### Actividad 3 — Formulario reactivo, validaciones y navegación

**Estructura**

```
src/app/
├── components/
│   └── solicitud-form/
└── app-routing.module.ts
```

**Qué se hizo y por qué**

- `SolicitudFormComponent` separa el registro del componente principal y mantiene la estructura
  modular. Se construye con `FormBuilder` para centralizar las reglas del formulario.
- **Validaciones aplicadas:**
  - `Validators.required` en nombre, código, correo, tipo y motivo, para impedir envíos incompletos.
  - `Validators.minLength(3)` en el nombre.
  - `Validators.email` en el correo, con mensaje específico cuando el formato no es válido.
  - `Validators.minLength(10)` en el motivo.
  - **Validador propio** `codigoValidator`, que envuelve `validarCodigo()` de la Actividad 1 para
    exigir el formato del código de estudiante (letra opcional + 6 a 10 dígitos).
- Se usa `markAllAsTouched()` cuando el formulario es inválido, para mostrar todos los mensajes
  pendientes después de intentar registrar.
- Al registrar, el componente delega en `SolicitudService.agregarSolicitud()` — el mismo servicio de
  la Actividad 2 — y navega por código con `Router.navigate(['/solicitudes'])`.
- **Navegación:** `RouterModule.forRoot()` define las rutas, `routerLink` navega sin recargar la
  aplicación, `routerLinkActive` resalta la pestaña actual y `router-outlet` en `app.component.html`
  renderiza el componente de la ruta activa.

**Rutas configuradas**

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | — | Redirige a `/solicitudes` |
| `/solicitudes` | `ListaSolicitudesComponent` | Listado de solicitudes registradas |
| `/nueva-solicitud` | `SolicitudFormComponent` | Formulario de registro |
| `/estudiantes-api` | `EstudiantesApiComponent` | Datos traídos de la API REST |
| `**` | — | Ruta comodín, redirige a `/solicitudes` |

### Actividad 4 — Consumo de una API REST con HttpClient

**Estructura**

```
src/app/
├── models/
│   └── solicitud-api.model.ts            (forma "cruda" que devuelve la API)
├── services/
│   └── solicitud-api.service.ts          (HttpClient + mapeo al modelo del caso)
└── components/
    └── estudiantes-api/
```

**Qué se hizo y por qué**

- Se importó `HttpClientModule` en `AppModule`, que es lo que habilita las peticiones HTTP en toda la
  aplicación.
- Se usó **JSONPlaceholder** (`https://jsonplaceholder.typicode.com/users`): API pública y gratuita,
  sin registro ni credenciales, cumpliendo la indicación de no publicar tokens ni accesos.
- El `HttpClient` vive **dentro de un servicio** que devuelve `Observable<SolicitudAcademica[]>`. El
  componente solo se suscribe; la vista no sabe de dónde vienen los datos.
- La respuesta se **adapta al modelo del caso** con el operador `map` de RxJS: cada usuario de la API
  se convierte en una `SolicitudAcademica`, reutilizando el modelo tipado de la Actividad 1. Así las
  columnas son coherentes con el resto de la aplicación en lugar de mostrar campos genéricos.
- Se manejan los estados de la petición con banderas `cargando` y `error`, más un botón **Recargar**,
  para dar retroalimentación mientras llega la respuesta o si algo falla.
- **No se implementó backend:** solo se consume una API que ya existe, porque Node.js corresponde a
  las sesiones 5 a 7.

---

## Cómo ejecutar o revisar

**Requisitos:** Node.js 18.x LTS (Angular 16 requiere Node 16.14+ o 18.10+) y npm.

```bash
# 1. Clonar el repositorio
git clone https://github.com/seph1924/gestion-solicitudes-academicas.git
cd gestion-solicitudes-academicas

# 2. Instalar dependencias
npm install

# 3. Levantar el servidor de desarrollo
npm start
```

Luego abrir **http://localhost:4200/** en el navegador.

**Otros comandos de verificación**

```bash
npm run build                            # Compilación de producción
npx tsc --noEmit -p tsconfig.app.json    # Verificación de tipado estricto
npm test                                 # Pruebas unitarias con Karma/Jasmine
```

**Recorrido sugerido para la revisión**

1. **Solicitudes** (`/solicitudes`) — tabla generada con `*ngFor` a partir del servicio inyectado.
2. **Nueva Solicitud** (`/nueva-solicitud`) — enviar el formulario vacío para ver las validaciones,
   luego completarlo correctamente y comprobar que navega al listado con la solicitud agregada.
3. **Estudiantes API** (`/estudiantes-api`) — datos traídos con `HttpClient` y mapeados al modelo;
   probar el botón *Recargar*.

---

## Estructura del proyecto

```
src/app/
├── models/                        # Actividad 1 — tipos del dominio
│   ├── solicitud.model.ts
│   └── solicitud-api.model.ts
├── utils/                         # Actividad 1 — funciones puras y validaciones
│   ├── helpers.ts
│   └── validaciones.ts
├── services/                      # Actividades 2 y 4 — acceso a datos
│   ├── solicitud.service.ts
│   └── solicitud-api.service.ts
├── components/
│   ├── navbar/                    # Actividad 2 — navegación
│   ├── lista-solicitudes/         # Actividad 2 — listado
│   ├── solicitud-form/            # Actividad 3 — formulario reactivo
│   └── estudiantes-api/           # Actividad 4 — vista de la API
├── app-routing.module.ts          # Actividad 3 — rutas
├── app.module.ts                  # Declaración e imports de módulos
└── app.component.*                # Shell: navbar y router-outlet
```

---

## Evidencias

> Guardar las capturas en la carpeta `docs/` del repositorio y enlazarlas aquí.

| # | Evidencia | Archivo |
|---|-----------|---------|
| 1 | Compilación exitosa (`ng build`) | `docs/01-build.png` |
| 2 | Verificación de tipado estricto (`tsc --noEmit`) | `docs/02-tsc.png` |
| 3 | Aplicación ejecutándose (`ng serve` + navegador) | `docs/03-serve.png` |
| 4 | Listado de solicitudes con datos del servicio | `docs/04-listado.png` |
| 5 | Formulario con **entradas inválidas** (mensajes de error visibles) | `docs/05-form-invalido.png` |
| 6 | Formulario con **entrada válida** y registro exitoso | `docs/06-form-valido.png` |
| 7 | Navegación entre rutas (URL visible en la barra) | `docs/07-rutas.png` |
| 8 | Datos obtenidos de la API REST | `docs/08-api-externa.png` |
| 9 | Petición HTTP en la pestaña *Network* del navegador | `docs/09-network.png` |

---

## Conclusiones

- **Definir los tipos antes que la interfaz** ahorró errores: al ser enums y no `string`, el
  compilador detectó valores inválidos en tiempo de desarrollo, y `Record<...>` obligó a cubrir todos
  los estados al escribir las etiquetas de la vista.
- **La inyección de dependencias separó responsabilidades** de forma concreta: los componentes no
  saben de dónde vienen los datos, y por eso la vista de la API externa reutiliza el mismo modelo y
  las mismas utilidades que la vista local sin duplicar código.
- **Centralizar las validaciones** permitió que la misma regla sirva como función pura en la lógica y
  como validador de Angular en el formulario reactivo, sin duplicar el criterio.
- **Trabajar en Angular 16 impone límites concretos:** la sintaxis de control de flujo `@if`/`@for`
  no está soportada, por lo que se usaron `*ngIf` y `*ngFor`. Verificar la versión antes de copiar
  ejemplos evita errores de compilación.
- **Coordinar las ramas importa tanto como el código:** al construir las Actividades 3 y 4 sobre la
  rama de la Actividad 2 en lugar de una copia paralela, se evitaron componentes duplicados con el
  mismo selector y conflictos en `app.module.ts`.
- **La solución queda preparada para las sesiones 5 a 7:** como el acceso a datos está aislado en
  servicios, sustituir la API de práctica por el backend propio de Node.js solo implicará cambiar la
  URL y el mapeo, sin tocar los componentes.

---

## Video de exposición

**Video público de YouTube:** [PEGAR AQUÍ EL ENLACE]

En el video participan todos los integrantes con cámara prendida, explicando el problema, el
procedimiento seguido, las decisiones técnicas y su relación con los contenidos de las sesiones 1 a 4.
