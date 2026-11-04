import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  historial: [
    {
      id: 1,
      tipo: 'INICIO',
      solicitud: 'Sistema',
      estudiante: 'Administrador',
      detalle: 'Sesión de gestión académica iniciada con sincronización activa.',
      hora: '08:00 AM'
    }
  ],
  totalAcciones: 1
};

export const notificacionesSlice = createSlice({
  name: 'notificaciones',
  initialState,
  reducers: {
    registrarAuditoria: (state, action) => {
      const { accion, estudiante, tramite, idSolicitud } = action.payload;
      const nuevoRegistro = {
        id: Date.now(),
        tipo: accion, // 'APROBADO', 'RECHAZADO', 'REVISION'
        solicitud: tramite,
        estudiante: estudiante,
        detalle: `Trámite (${idSolicitud || 'S/N'}) fue procesado como ${accion}.`,
        hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      state.historial.unshift(nuevoRegistro);
      state.totalAcciones += 1;
    },
    limpiarHistorial: (state) => {
      state.historial = [];
      state.totalAcciones = 0;
    }
  }
});

export const { registrarAuditoria, limpiarHistorial } = notificacionesSlice.actions;
export default notificacionesSlice.reducer;