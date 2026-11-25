
# Implementación de Next.js: SSR, SSG y rutas dinámicas

## 1. Objetivo

Implementar Next.js en la Plataforma de Gestión de Solicitudes Académicas, aplicando diferentes estrategias de renderizado y rutas dinámicas.

## 2. Tecnologías utilizadas

- Next.js 16.4.6
- React
- JavaScript
- Node.js
- App Router

## 3. Implementaciones realizadas

### 3.1 Server-Side Rendering (SSR)

Se implementó la ruta `/solicitudes`, utilizando `connection()` para generar el contenido dinámicamente durante cada petición.

La vista presenta el listado de solicitudes académicas.

### 3.2 Static Site Generation (SSG)

Se implementó la ruta `/informacion`, que presenta información sobre los servicios académicos disponibles.

Esta página se genera como contenido estático durante la compilación.

### 3.3 Rutas dinámicas

Se implementó la ruta `/solicitudes/[id]`, que permite consultar el detalle de una solicitud según su identificador.

Se utilizó `generateStaticParams()` para generar las páginas correspondientes a los identificadores 101, 102, 103 y 104.

## 4. Justificación técnica

Se utilizó SSR para el listado de solicitudes porque permite generar contenido durante cada petición.

Se utilizó SSG para la información académica porque contiene contenido estable que no necesita actualizarse en cada petición.

Las rutas dinámicas permiten acceder individualmente al detalle de cada solicitud mediante su identificador.

## 5. Verificación

Se ejecutó el comando:

`npm run build`

La compilación finalizó correctamente.

Resultados:

- `/`: contenido estático.
- `/informacion`: contenido estático.
- `/solicitudes`: renderizado dinámico.
- `/solicitudes/101`: página estática generada.
- `/solicitudes/102`: página estática generada.
- `/solicitudes/103`: página estática generada.
- `/solicitudes/104`: página estática generada.

## 6. Conclusión

La implementación permitió aplicar diferentes estrategias de renderizado de Next.js, generar rutas dinámicas y comprobar el funcionamiento mediante una compilación de producción.
