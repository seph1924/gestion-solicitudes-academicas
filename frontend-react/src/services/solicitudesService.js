import api, { ApiError } from './api';
import { esSolicitudValida, normalizarSolicitud } from '../utils/validaciones';
import { logger } from '../utils/logger';

// Capa de servicio: una función por cada endpoint de /api/solicitudes.
// Los componentes no conocen URLs ni Axios; solo llaman a estas funciones.

const respuestaInvalida = () =>
  new ApiError({
    tipo: 'VALIDACION',
    mensaje: 'El servidor devolvió una respuesta con un formato inesperado.'
  });

// Valida que la respuesta sea una solicitud correcta y la normaliza
function procesarSolicitud(data) {
  if (!esSolicitudValida(data)) throw respuestaInvalida();
  return normalizarSolicitud(data);
}

// GET /api/solicitudes
export async function listarSolicitudes() {
  const { data } = await api.get('/solicitudes');

  if (!Array.isArray(data)) throw respuestaInvalida();

  // Se descartan los elementos que no cumplen el formato y se avisa en consola
  const validas = data.filter(esSolicitudValida);
  if (validas.length !== data.length) {
    logger.warn(`[API] Se descartaron ${data.length - validas.length} solicitudes con formato inválido.`);
  }
  return validas.map(normalizarSolicitud);
}

// GET /api/solicitudes/:id
export async function obtenerSolicitud(id) {
  const { data } = await api.get(`/solicitudes/${id}`);
  return procesarSolicitud(data);
}

// POST /api/solicitudes
export async function crearSolicitud(datos) {
  const { data, status } = await api.post('/solicitudes', {
    codigoEstudiante: datos.codigoEstudiante.trim().toUpperCase(),
    nombreEstudiante: datos.nombreEstudiante.trim(),
    tipoSolicitud: datos.tipoSolicitud,
    motivo: datos.motivo.trim()
  });

  if (status !== 201) throw respuestaInvalida();
  return procesarSolicitud(data);
}

// PATCH /api/solicitudes/:id  (actualización parcial: solo el estado)
export async function actualizarEstadoSolicitud(id, estado) {
  const { data } = await api.patch(`/solicitudes/${id}`, { estado });
  return procesarSolicitud(data);
}

// DELETE /api/solicitudes/:id
export async function eliminarSolicitud(id) {
  const { data } = await api.delete(`/solicitudes/${id}`);
  if (!data?.ok) throw respuestaInvalida();
  return data.mensaje;
}
