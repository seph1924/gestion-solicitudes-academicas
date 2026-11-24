import { useState, useEffect, useCallback } from 'react';
import * as solicitudesService from '../services/solicitudesService';

// Hook que centraliza el consumo de la API de solicitudes.
function useSolicitudes(habilitado = true) {
  const [solicitudes, setSolicitudes] = useState([]);
  const [cargando, setCargando] = useState(habilitado);
  const [error, setError] = useState(null);
  const [enProceso, setEnProceso] = useState([]);

  const marcar = (id, activo) =>
    setEnProceso((ids) =>
      activo ? [...ids, id] : ids.filter((x) => x !== id)
    );

  const fallo = (e) => ({
    ok: false,
    mensaje: e.message,
    errores: e.errores ?? []
  });

  // GET: cargar solicitudes
  const recargar = useCallback(async () => {
    if (!habilitado) return;

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
  }, [habilitado]);

  // Cargar únicamente cuando la autenticación esté disponible
  useEffect(() => {
    if (habilitado) {
      recargar();
    } else {
      setSolicitudes([]);
      setCargando(false);
      setError(null);
    }
  }, [habilitado, recargar]);

  // POST: registrar solicitud
  const registrarSolicitud = async (datos) => {
    try {
      const nueva = await solicitudesService.crearSolicitud(datos);

      setSolicitudes((anterior) => [nueva, ...anterior]);

      return {
        ok: true,
        mensaje: 'Solicitud registrada correctamente.'
      };
    } catch (e) {
      return fallo(e);
    }
  };

  // PATCH: cambiar estado
  const cambiarEstado = async (id, nuevoEstado) => {
    marcar(id, true);

    try {
      const actualizada =
        await solicitudesService.actualizarEstadoSolicitud(id, nuevoEstado);

      setSolicitudes((anterior) =>
        anterior.map((s) => (s.id === id ? actualizada : s))
      );

      return {
        ok: true,
        mensaje: 'Estado actualizado correctamente.'
      };
    } catch (e) {
      if (e.status === 404) {
        setSolicitudes((anterior) =>
          anterior.filter((s) => s.id !== id)
        );
      }

      return fallo(e);
    } finally {
      marcar(id, false);
    }
  };

  // DELETE: eliminar solicitud
  const eliminarSolicitud = async (id) => {
    marcar(id, true);

    try {
      const mensaje = await solicitudesService.eliminarSolicitud(id);

      setSolicitudes((anterior) =>
        anterior.filter((s) => s.id !== id)
      );

      return { ok: true, mensaje };
    } catch (e) {
      if (e.status === 404) {
        setSolicitudes((anterior) =>
          anterior.filter((s) => s.id !== id)
        );
      }

      return fallo(e);
    } finally {
      marcar(id, false);
    }
  };

  // Filtro local
  const filtrarSolicitudes = (estado) =>
    estado === 'TODOS'
      ? solicitudes
      : solicitudes.filter((s) => s.estado === estado);

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