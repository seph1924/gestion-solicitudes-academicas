# Plataforma de Gestión de Solicitudes Académicas — PA3 (Frontend)

**Curso:** PROGRAMACIÓN WEB II  
**Código:** 30690  
**Periodo académico:** 202620  
**Evaluación:** PA3 — Proceso de Aprendizaje 3  
**Unidad:** Construcción de Aplicaciones Frontend con React.js  
**Docente:** WILDER JULIO ESPINOZA BRAVO  
**Fecha:** 03/11/2026

**Video público de YouTube:** https://youtu.be/18-5hXHvLk8

---

## 1. Integrantes y participación

## 1. Integrantes y participación

| N.º | Integrante | Rol | Participación |
|:---:|---|---|---|
| 1 | **Samuel Pacheco** | Estructura y diseño de React | Configuración del frontend con React y Vite, organización de componentes, estructura visual y estilos de la aplicación. |
| 2 | **Danny Posadas** | Funcionalidades y Hooks | Desarrollo de funcionalidades, formularios y gestión de solicitudes mediante Hooks como `useState` y `useEffect`. |
| 3 | **Juan Cáceres** | Navegación con React Router | Configuración de rutas, navegación mediante `NavLink`, organización del `Layout` con `Outlet` e integración de la pantalla principal. |
| 4 | **Josep Palacios** | Estado global con Context API | Desarrollo de la gestión de estado global mediante Context API, Provider y consumo del contexto. |
| 5 | **Miguel Villafuerte** | Redux, integración y documentación | Introducción a Redux, revisión de la integración del proyecto, pruebas y documentación. |

Todos los integrantes son responsables del resultado final y deben conocer la solución completa presentada.

---

## 2. Descripción del proyecto

La Plataforma de Gestión de Solicitudes Académicas es una aplicación web orientada a facilitar la consulta, organización y administración de solicitudes realizadas por estudiantes, como rectificación de notas, reserva de matrícula, cartas de presentación y exámenes extemporáneos.

En esta tercera etapa del proyecto se desarrolla una aplicación frontend utilizando **React.js**, con el objetivo de construir una interfaz de usuario dinámica y organizada mediante componentes reutilizables.

La aplicación incorpora navegación entre diferentes vistas, gestión de estados y alternativas para compartir información entre componentes, utilizando React Router, Hooks, Context API y una introducción básica a Redux.

Para esta etapa se trabaja con datos locales o simulados, de acuerdo con el alcance establecido para la PA3.

## 3. Objetivo

Desarrollar una aplicación de una sola página (SPA) utilizando React.js, aplicando componentes, JSX, Hooks, React Router y mecanismos de gestión de estado global mediante Context API y Redux.

---

## 4. Desarrollo

El trabajo se distribuyó entre los integrantes según sus responsabilidades y posteriormente se integró en el repositorio grupal de GitHub.

1. **Estructura y diseño de React:** se organizó el frontend utilizando React y Vite, distribuyendo la interfaz en componentes reutilizables y manteniendo una estructura ordenada.

2. **Funcionalidades y Hooks:** se desarrollaron funcionalidades para gestionar la información de la interfaz y las solicitudes académicas. Se utilizaron Hooks como `useState` y `useEffect` para administrar estados y efectos de los componentes.

3. **Navegación con React Router:** se implementó React Router DOM para permitir el desplazamiento entre las diferentes vistas de la aplicación sin recargar completamente la página. Se configuraron rutas mediante `BrowserRouter`, `Routes` y `Route`, además de utilizar `NavLink` y `Outlet`.

4. **Estado global con Context API:** se trabajó con Context API para compartir información entre componentes mediante un Provider y el consumo del contexto, evitando pasar propiedades manualmente por varios niveles.

5. **Introducción a Redux:** se incorporó un flujo básico de administración de estado con Redux Toolkit, como alternativa para centralizar y organizar información compartida.

---

## 5. Solución propuesta

La solución consiste en una SPA que organiza las funcionalidades de la plataforma en diferentes vistas, permitiendo al usuario consultar información académica y navegar entre las secciones de manera sencilla.

### Actividad 1 — SPA en React con JSX, componentes y Hooks

Se utiliza React.js para construir la interfaz mediante componentes reutilizables.

Los Hooks permiten administrar el comportamiento de los componentes:

- `useState`: permite manejar estados internos y actualizar la información mostrada.
- `useEffect`: permite ejecutar efectos secundarios cuando se cumplen determinadas condiciones del componente.

### Actividad 2 — Navegación con React Router

Se implementó React Router DOM para gestionar la navegación entre las vistas principales de la aplicación.

**Rutas configuradas:**

| Ruta | Vista |
|---|---|
| `/` | Página principal |
| `/solicitudes` | Gestión de solicitudes |
| `/nueva-solicitud` | Registro de una nueva solicitud |
| `/resumen` | Resumen de información |

**Elementos utilizados:**

- `BrowserRouter`: habilita el sistema de navegación.
- `Routes` y `Route`: definen las rutas de la aplicación.
- `NavLink`: permite navegar entre las diferentes secciones.
- `Outlet`: permite mostrar las vistas correspondientes dentro del diseño general (`Layout`).

La implementación permite cambiar de sección sin realizar una recarga completa de la página, conservando el comportamiento de una SPA.

### Actividad 3 — Estado global con Context API

Se contempla el uso de Context API para compartir información entre diferentes componentes de la aplicación.

Sus elementos principales son:

- `createContext`: permite crear el contexto.
- `Provider`: proporciona los datos compartidos.
- `useContext`: permite consumir la información desde los