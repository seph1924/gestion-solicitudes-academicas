// Etiquetas legibles para los estados (el valor guardado sigue el formato del backend).
export const ETIQUETAS_ESTADO = {
  PENDIENTE: 'Pendiente',
  EN_PROCESO: 'En proceso',
  APROBADO: 'Aprobado',
  RECHAZADO: 'Rechazado'
};

export function formatearFecha(fechaIso) {
  return new Date(fechaIso).toLocaleDateString('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

export function contarPorEstado(solicitudes, estado) {
  return solicitudes.filter((s) => s.estado === estado).length;
}
