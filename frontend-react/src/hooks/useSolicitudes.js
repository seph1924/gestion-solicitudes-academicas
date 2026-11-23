import { useState, useEffect, useCallback } from 'react';
import * as solicitudesService from '../services/solicitudesService';

// Hook que centraliza el consumo de la API de solicitudes.
// Expone los datos, el estado de la petición (cargando / error) y las operaciones CRUD.
// Cada operación devuelve { ok, mensaje, errores } para que la vista muestre el resultado.
function useSolicitudes() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  // IDs de solicitudes con una operación en curso (para deshabilitar sus controles)
  const [enProceso, setEnProceso] = useState([]);

  const marcar = (id, activo) =>
    setEnProceso((ids) => (activo ? [...ids, id] : ids.filter((x) => x !== id)));

  // Convierte un ApiError en el resultado que reciben las vistas
  const fallo = (e) => ({ ok: false, mensaje: e.message, errores: e.errores ?? [] });

  // GET: cargar el listado desde la API
  const recargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const datos = await solicitudesService.listarSolicitudes();
      setSolicitudes(datos);
    } catch (e) {
      setError(e.message);
    } finally {
      setCargando(false);
    }
  }, []);

  // Carga inicial al montar la aplicación
  useEffect(() => {
    recargar();
  }, [recargar]);

  // POST: registrar una nueva solicitud
  const registrarSolicitud = async (datos) => {
    try {
      const nueva = await solicitudesService.crearSolicitud(datos);
      setSolicitudes((anterior) => [nueva, ...anterior]);
      return { ok: true, mensaje: 'Solicitud registrada correctamente.' };
    } catch (e) {
      return fallo(e);
    }
  };

  // PATCH: cambiar el estado de una solicitud
  const cambiarEstado = async (id, nuevoEstado) => {
    marcar(id, true);
    try {
      const actualizada = await solicitudesService.actualizarEstadoSolicitud(id, nuevoEstado);
      setSolicitudes((anterior) => anterior.map((s) => (s.id === id ? actualizada : s)));
      return { ok: true, mensaje: 'Estado actualizado correctamente.' };
    } catch (e) {
      // Si la solicitud ya no existe en el servidor, se retira de la lista local
      if (e.status === 404) setSolicitudes((anterior) => anterior.filter((s) => s.id !== id));
      return fallo(e);
    } finally {
      marcar(id, false);
    }
  };

  // DELETE: eliminar una solicitud
  const eliminarSolicitud = async (id) => {
    marcar(id, true);
    try {
      const mensaje = await solicitudesService.eliminarSolicitud(id);
      setSolicitudes((anterior) => anterior.filter((s) => s.id !== id));
      return { ok: true, mensaje };
    } catch (e) {
      if (e.status === 404) setSolicitudes((anterior) => anterior.filter((s) => s.id !== id));
      return fallo(e);
    } finally {
      marcar(id, false);
    }
  };

  // Filtro local por estado (no requiere nueva petición)
  const filtrarSolicitudes = (estado) =>
    estado === 'TODOS' ? solicitudes : solicitudes.filter((s) => s.estado === estado);

  return {
    solicitudes,
    cargando,
    error,
    enProceso,
    recargar,
    registrarSolicitud,
    cambiarEstado,
    eliminarSolicitud,
    filtrarSolicitudes
  };
}

export default useSolicitudes;
