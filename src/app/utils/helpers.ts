// ============================================================
// Actividad 1: funciones puras sobre las solicitudes.
// Ninguna modifica el arreglo ni el objeto original: se devuelve
// siempre una copia nueva con spread, para que una funcion no
// cambie datos "por detras".
// Trabajan sobre las interfaces y enums definidos en
// models/solicitud.model.ts.
// ============================================================

import { EstadoSolicitud, SolicitudAcademica, TipoSolicitud } from '../models/solicitud.model';

// Listas derivadas de los enums, para alimentar selects y resumenes
export const TIPOS_SOLICITUD: TipoSolicitud[] = Object.values(TipoSolicitud);
export const ESTADOS_SOLICITUD: EstadoSolicitud[] = Object.values(EstadoSolicitud);

// Datos que entrega el formulario: la solicitud sin los campos
// que genera el sistema.
export type NuevaSolicitud = Omit<SolicitudAcademica, 'id' | 'fechaCreacion' | 'estado'>;

// Etiquetas legibles del estado. Record obliga a cubrir todos los
// valores del enum: si se agrega uno nuevo, TypeScript avisa.
const ETIQUETAS_ESTADO: Record<EstadoSolicitud, string> = {
  [EstadoSolicitud.PENDIENTE]: 'Pendiente',
  [EstadoSolicitud.EN_PROCESO]: 'En proceso',
  [EstadoSolicitud.APROBADO]: 'Aprobado',
  [EstadoSolicitud.RECHAZADO]: 'Rechazado'
};

export const etiquetaEstado = (estado: EstadoSolicitud): string => ETIQUETAS_ESTADO[estado];

// Clase CSS a partir del estado, para colorear la vista
export const claseEstado = (estado: EstadoSolicitud): string =>
  `estado--${estado.toLowerCase().replace('_', '-')}`;

// Devuelve una solicitud nueva con el estado cambiado (no muta la original)
export const cambiarEstado = (
  solicitud: SolicitudAcademica,
  estado: EstadoSolicitud
): SolicitudAcademica => ({
  ...solicitud,
  estado
});

// Devuelve una lista nueva con el estado cambiado solo en la solicitud indicada
export const cambiarEstadoEnLista = (
  solicitudes: SolicitudAcademica[],
  id: number,
  estado: EstadoSolicitud
): SolicitudAcademica[] =>
  solicitudes.map((solicitud) => (solicitud.id === id ? cambiarEstado(solicitud, estado) : solicitud));

// reduce: cuenta cuantas solicitudes hay por cada estado
export const contarPorEstado = (
  solicitudes: SolicitudAcademica[]
): Record<EstadoSolicitud, number> => {
  const inicial = ESTADOS_SOLICITUD.reduce(
    (acumulado, estado) => ({ ...acumulado, [estado]: 0 }),
    {} as Record<EstadoSolicitud, number>
  );

  return solicitudes.reduce(
    (conteo, { estado }) => ({ ...conteo, [estado]: conteo[estado] + 1 }),
    inicial
  );
};

// filter
export const filtrarPorEstado = (
  solicitudes: SolicitudAcademica[],
  estado: EstadoSolicitud
): SolicitudAcademica[] => solicitudes.filter((solicitud) => solicitud.estado === estado);

// find
export const buscarPorId = (
  solicitudes: SolicitudAcademica[],
  id: number
): SolicitudAcademica | undefined => solicitudes.find((solicitud) => solicitud.id === id);

// Destructuring + template literals
export const resumenSolicitud = ({
  id,
  nombreEstudiante,
  codigoEstudiante,
  tipoSolicitud,
  estado
}: SolicitudAcademica): string =>
  `#${id} - ${nombreEstudiante} (${codigoEstudiante}): ${tipoSolicitud} [${etiquetaEstado(estado)}]`;

// Parametro por defecto
export const formatearFecha = (fecha: string, local: string = 'es-PE'): string => {
  const valor = new Date(fecha);
  return Number.isNaN(valor.getTime()) ? fecha : valor.toLocaleDateString(local);
};
