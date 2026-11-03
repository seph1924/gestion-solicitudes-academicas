# Frontend React — PA3

SPA en React (Vite) de la Plataforma de Gestión de Solicitudes Académicas. Usa datos simulados (`src/data/solicitudes.js`); el consumo de la API con Axios corresponde a la sesión 11.

## Ejecutar

```bash
cd frontend-react
npm install
npm run dev
```

Abrir http://localhost:5173

## Estructura

```
src/
├── components/
│   ├── layout/      Navbar, Layout y Footer (estructura común de las vistas)
│   └── ui/          Componentes visuales reutilizables: SolicitudCard, EstadoBadge,
│                    StatCard, PageHeader, Boton, EstadoVacio (+ ui.css)
├── pages/           Vistas de la app (Persona 3 - React Router)
├── hooks/           Hooks personalizados (Persona 2 - useState/useEffect)
├── context/         Context API y Provider (Persona 4)
├── store/           Store y slices de Redux (Persona 5)
├── data/            Datos simulados y catálogos (tipos y estados)
├── utils/           Funciones de formato (fechas, etiquetas, conteos)
├── App.jsx          Vista provisional con los componentes; se reemplazará por las rutas
└── index.css        Variables de diseño (colores, radios, sombras) y estilos globales
```

## Notas para el equipo

- **Persona 2:** `App.jsx` lee `solicitudesIniciales` directamente. Pasarlo a `useState` y cargarlo con `useEffect`.
- **Persona 3:** el menú está en `Navbar.jsx` (`OPCIONES_MENU`) con `<a href>`. Cambiarlo a `<NavLink to>`; la clase `.active` ya tiene estilo. En `Layout.jsx`, `{children}` puede pasar a ser `<Outlet />`.
- **Persona 4 y 5:** `SolicitudCard` recibe la prop `acciones` para agregar botones (cambiar estado, favoritos, etc.) sin modificar la tarjeta.
- Los colores se cambian en `:root` de `index.css`; evitar colores sueltos en los componentes.
