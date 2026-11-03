// Datos simulados para el PA3: la consigna pide trabajar con datos locales
// (el consumo de la API con Axios corresponde a la sesión 11).
// Los campos siguen el mismo modelo del backend (backend/src/models/Solicitud.js).

export const TIPOS_SOLICITUD = [
  'Rectificación de Nota',
  'Reserva de Matrícula',
  'Carta de Presentación',
  'Examen Extemporáneo'
];

export const ESTADOS_SOLICITUD = ['PENDIENTE', 'EN_PROCESO', 'APROBADO', 'RECHAZADO'];

export const solicitudesIniciales = [
  {
    id: 1,
    codigoEstudiante: 'U20230145',
    nombreEstudiante: 'María Fernández Quispe',
    tipoSolicitud: 'Rectificación de Nota',
    motivo: 'La nota del examen parcial de Programación Web II no coincide con la publicada en el aula virtual.',
    fechaCreacion: '2026-10-02T09:15:00',
    estado: 'PENDIENTE'
  },
  {
    id: 2,
    codigoEstudiante: 'U20221187',
    nombreEstudiante: 'Jorge Ramírez Torres',
    tipoSolicitud: 'Reserva de Matrícula',
    motivo: 'Solicito reservar la matrícula del siguiente ciclo por motivos laborales.',
    fechaCreacion: '2026-10-05T14:40:00',
    estado: 'EN_PROCESO'
  },
  {
    id: 3,
    codigoEstudiante: 'U20240032',
    nombreEstudiante: 'Lucía Mendoza Rojas',
    tipoSolicitud: 'Carta de Presentación',
    motivo: 'Requiero carta de presentación para iniciar prácticas preprofesionales en una empresa de software.',
    fechaCreacion: '2026-10-08T11:05:00',
    estado: 'APROBADO'
  },
  {
    id: 4,
    codigoEstudiante: 'U20230876',
    nombreEstudiante: 'Diego Salazar Huamán',
    tipoSolicitud: 'Examen Extemporáneo',
    motivo: 'No pude rendir el examen final por un problema de salud, adjunto certificado médico.',
    fechaCreacion: '2026-10-12T16:20:00',
    estado: 'RECHAZADO'
  },
  {
    id: 5,
    codigoEstudiante: 'U20220459',
    nombreEstudiante: 'Valeria Chávez Paredes',
    tipoSolicitud: 'Rectificación de Nota',
    motivo: 'La nota de la PA2 aparece como cero aunque el trabajo fue entregado a tiempo.',
    fechaCreacion: '2026-10-15T08:30:00',
    estado: 'PENDIENTE'
  },
  {
    id: 6,
    codigoEstudiante: 'U20241210',
    nombreEstudiante: 'Andrés Castillo Vega',
    tipoSolicitud: 'Carta de Presentación',
    motivo: 'Necesito carta de presentación para un proyecto de voluntariado tecnológico.',
    fechaCreacion: '2026-10-20T10:10:00',
    estado: 'EN_PROCESO'
  }
];
