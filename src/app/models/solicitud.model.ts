// Enumerados para el tipado estricto de opciones
export enum TipoSolicitud {
  RECTIFICACION_NOTA = 'Rectificación de Nota',
  RESERVA_MATRICULA = 'Reserva de Matrícula',
  CARTA_PRESENTACION = 'Carta de Presentación',
  EXAMEN_EXTEMPORANEO = 'Examen Extemporáneo'
}

export enum EstadoSolicitud {
  PENDIENTE = 'PENDIENTE',
  EN_PROCESO = 'EN_PROCESO',
  APROBADO = 'APROBADO',
  RECHAZADO = 'RECHAZADO'
}

// Interfaz que define la estructura estricta de una Solicitud Académica
export interface SolicitudAcademica {
  id: number;
  codigoEstudiante: string;
  nombreEstudiante: string;
  // Opcional: lo registra el formulario de la Actividad 3 para contactar al estudiante.
  // Es opcional para no invalidar las solicitudes ya creadas sin este dato.
  correoEstudiante?: string;
  tipoSolicitud: TipoSolicitud;
  motivo: string;
  fechaCreacion: string;
  estado: EstadoSolicitud;
}