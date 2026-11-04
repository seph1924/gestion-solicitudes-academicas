import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { limpiarHistorial } from '../../store/notificacionesSlice';

export const PanelNotificacionesRedux = () => {
  const { historial, totalAcciones } = useSelector((state) => state.notificaciones);
  const dispatch = useDispatch();

  const coloresBadge = {
    APROBADO: { bg: '#dcfce7', text: '#15803d', border: '#bbf7d0' },
    RECHAZADO: { bg: '#fee2e2', text: '#b91c1c', border: '#fecaca' },
    REVISION: { bg: '#fef3c7', text: '#b45309', border: '#fde68a' },
    INICIO: { bg: '#e0f2fe', text: '#0369a1', border: '#bae6fd' }
  };

  return (
    <section style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '20px 24px',
      marginBottom: '28px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <div>
          <h2 style={{ fontSize: '17px', fontWeight: 'bold', margin: 0, color: '#0f172a' }}>
            Bitácora de Auditoría en Tiempo Real
          </h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
            Monitoreo global de operaciones sobre solicitudes. Total de eventos registrados: <strong>{totalAcciones}</strong>
          </p>
        </div>

        {totalAcciones > 0 && (
          <button
            onClick={() => dispatch(limpiarHistorial())}
            style={{
              backgroundColor: '#f8fafc',
              color: '#64748b',
              border: '1px solid #cbd5e1',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            Limpiar registro
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
        {historial.length === 0 ? (
          <div style={{ color: '#94a3b8', fontSize: '13px', fontStyle: 'italic', padding: '8px 0' }}>
            No hay operaciones registradas en el estado global.
          </div>
        ) : (
          historial.map((item) => {
            const estilo = coloresBadge[item.tipo] || coloresBadge.INICIO;
            return (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  backgroundColor: estilo.bg,
                  color: estilo.text,
                  border: `1px solid ${estilo.border}`,
                  fontSize: '13px'
                }}
              >
                <div>
                  <strong>[{item.tipo}]</strong> {item.estudiante} — <em>{item.solicitud}</em> ({item.detalle})
                </div>
                <span style={{ fontSize: '11px', opacity: 0.85, whiteSpace: 'nowrap', marginLeft: '12px' }}>
                  {item.hora}
                </span>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};