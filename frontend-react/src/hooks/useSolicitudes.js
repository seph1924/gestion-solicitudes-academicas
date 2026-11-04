
import { useState, useEffect } from 'react';
import { solicitudesIniciales } from '../data/solicitudes';

const CLAVE_STORAGE = 'solicitudes_academicas';

function useSolicitudes() {

  // Recuperar los datos guardados
  const [solicitudes, setSolicitudes] = useState(() => {
    try {
      const guardadas = localStorage.getItem(CLAVE_STORAGE);

      return guardadas
        ? JSON.parse(guardadas)
        : solicitudesIniciales;
    } catch {
      return solicitudesIniciales;
    }
  });

  // Guardar automáticamente los cambios
  useEffect(() => {
    localStorage.setItem(
      CLAVE_STORAGE,
      JSON.stringify(solicitudes)
    );
  }, [solicitudes]);

  // Registrar solicitud
  const agregarSolicitud = (datos) => {
    const nuevaSolicitud = {
      ...datos,
      id: Date.now(),
      estado: 'PENDIENTE',
      fechaCreacion: new Date().toISOString()
    };

    setSolicitudes((actuales) => [
      nuevaSolicitud,
      ...actuales
    ]);
  };

  // Eliminar solicitud
  const eliminarSolicitud = (id) => {
    setSolicitudes((actuales) =>
      actuales.filter((s) => s.id !== id)
    );
  };

  // Cambiar estado
  const cambiarEstado = (id, nuevoEstado) => {
    setSolicitudes((actuales) =>
      actuales.map((s) =>
        s.id === id
          ? { ...s, estado: nuevoEstado }
          : s
      )
    );
  };

  // Buscar solicitudes
  const buscarSolicitudes = (texto) => {
    const busqueda = texto.toLowerCase().trim();

    return solicitudes.filter((s) =>
      [
        s.nombreEstudiante,
        s.codigoEstudiante,
        s.tipoSolicitud,
        s.motivo
      ]
        .join(' ')
        .toLowerCase()
        .includes(busqueda)
    );
  };

  // Filtrar por estado
  const filtrarPorEstado = (estado) => {
    if (estado === 'TODOS') return solicitudes;

    return solicitudes.filter(
      (s) => s.estado === estado
    );
  };

  return {
    solicitudes,
    agregarSolicitud,
    eliminarSolicitud,
    cambiarEstado,
    buscarSolicitudes,
    filtrarPorEstado
  };
}

export default useSolicitudes;