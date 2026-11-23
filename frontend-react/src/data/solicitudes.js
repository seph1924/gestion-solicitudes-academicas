// Catálogos compartidos por los formularios, filtros y validaciones.
// Deben coincidir con los valores "enum" del modelo del backend (backend/src/models/Solicitud.js).
// Desde la PA4 las solicitudes ya no son simuladas: se obtienen de la API (ver src/services).
// Los datos de ejemplo ahora se cargan en MongoDB con: cd backend && npm run seed

export const TIPOS_SOLICITUD = [
  'Rectificación de Nota',
  'Reserva de Matrícula',
  'Carta de Presentación',
  'Examen Extemporáneo'
];

export const ESTADOS_SOLICITUD = ['PENDIENTE', 'EN_PROCESO', 'APROBADO', 'RECHAZADO'];
