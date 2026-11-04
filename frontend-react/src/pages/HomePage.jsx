
import PageHeader from '../components/ui/PageHeader';
import StatCard from '../components/ui/StatCard';
import SolicitudCard from '../components/ui/SolicitudCard';
import Boton from '../components/ui/Boton';

import { solicitudesIniciales, ESTADOS_SOLICITUD } from '../data/solicitudes';
import { ETIQUETAS_ESTADO, contarPorEstado } from '../utils/formato';

import { useDispatch } from 'react-redux';
import { registrarAuditoria } from '../store/notificacionesSlice';
import { PanelNotificacionesRedux } from '../components/ui/PanelNotificacionesRedux';

function HomePage() {
  const dispatch = useDispatch();

  return (
    <>
      <PageHeader
        titulo="Solicitudes académicas"
        subtitulo="Consulta y organiza las solicitudes registradas por los estudiantes."
        accion={<Boton>+ Nueva solicitud</Boton>}
      />

      <PanelNotificacionesRedux />

      <section className="grilla-stats">
        <StatCard titulo="Total" valor={solicitudesIniciales.length} />

        {ESTADOS_SOLICITUD.map((estado) => (
          <StatCard
            key={estado}
            titulo={ETIQUETAS_ESTADO[estado]}
            valor={contarPorEstado(solicitudesIniciales, estado)}
            variante={estado.toLowerCase()}
          />
        ))}
      </section>

      <section className="grilla">
        {solicitudesIniciales.map((solicitud) => (
          <SolicitudCard
            key={solicitud.id}
            solicitud={solicitud}
            acciones={
              <div style={{ display: 'flex', gap: '8px' }}>
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    dispatch(
                      registrarAuditoria({
                        accion: 'REVISION',
                        estudiante: solicitud.nombreEstudiante,
                        tramite: solicitud.tipoSolicitud,
                        idSolicitud: solicitud.codigoEstudiante,
                      })
                    )
                  }
                >
                  <Boton variante="secundario">Auditar</Boton>
                </span>

                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    dispatch(
                      registrarAuditoria({
                        accion: 'APROBADO',
                        estudiante: solicitud.nombreEstudiante,
                        tramite: solicitud.tipoSolicitud,
                        idSolicitud: solicitud.codigoEstudiante,
                      })
                    )
                  }
                >
                  <Boton>Aprobar</Boton>
                </span>
              </div>
            }
          />
        ))}
      </section>
    </>
  );
}

export default HomePage;
