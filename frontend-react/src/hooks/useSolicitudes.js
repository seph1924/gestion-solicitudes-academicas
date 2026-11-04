import { useState, useEffect } from 'react';
import { solicitudesIniciales } from '../data/solicitudes';

function useSolicitudes() {

  // Estado inicial con los datos simulados
  const [solicitudes, setSolicitudes] = useState(
    solicitudesIniciales
  );

  // Detectar cambios en las solicitudes
  useEffect(() => {
    console.log('Solicitudes actualizadas:', solicitudes);
  }, [solicitudes]);

  // Registrar nueva solicitud
  const registrarSolicitud = (datos) => {

    const nuevaSolicitud = {
      id: Date.now(),
      codigoEstudiante: datos.codigoEstudiante,
      nombreEstudiante: datos.nombreEstudiante,
      tipoSolicitud: datos.tipoSolicitud,
      motivo: datos.motivo,
      fechaCreacion: new Date().toISOString(),
      estado: 'PENDIENTE'
    };

    setSolicitudes((anterior) => [
      ...anterior,
      nuevaSolicitud
    ]);
  };

  // Cambiar estado de una solicitud
  const cambiarEstado = (id, nuevoEstado) => {

    setSolicitudes((anterior) =>
      anterior.map((solicitud) =>
        solicitud.id === id
          ? { ...solicitud, estado: nuevoEstado }
          : solicitud
      )
    );
  };

  // Buscar solicitudes por estado
  const filtrarSolicitudes = (estado) => {

    if (estado === 'TODOS') {
      return solicitudes;
    }

    return solicitudes.filter(
      (solicitud) => solicitud.estado === estado
    );
  };

  return {
    solicitudes,
    registrarSolicitud,
    cambiarEstado,
    filtrarSolicitudes
  };
}

export default useSolicitudes;
