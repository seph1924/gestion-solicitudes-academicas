import { useNavigate } from 'react-router-dom';

import PageHeader from '../components/ui/PageHeader';
import StatCard from '../components/ui/StatCard';
import SolicitudCard from '../components/ui/SolicitudCard';
import Boton from '../components/ui/Boton';

import { ESTADOS_SOLICITUD } from '../data/solicitudes';
import {
  ETIQUETAS_ESTADO,
  contarPorEstado
} from '../utils/formato';

import { useDispatch } from 'react-redux';
import { registrarAuditoria } from '../store/notificacionesSlice';
import { PanelNotificacionesRedux } from '../components/ui/PanelNotificacionesRedux';

function HomePage({ solicitudes }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <PageHeader
        titulo="Solicitudes académicas"
        subtitulo="Consulta y organiza las solicitudes registradas por los estudiantes."
        accion={
          <Boton onClick={() => navigate('/nueva-solicitud')}>
            + Nueva solicitud
          </Boton>
        }
      />

      <PanelNotificacionesRedux />

      {/* ESTADÍSTICAS */}
      <section className="grilla-stats">
        <StatCard
          titulo="Total"
          valor={solicitudes.length}
        />

        {ESTADOS_SOLICITUD.map((estado) => (
          <StatCard
            key={estado}
            titulo={ETIQUETAS_ESTADO[estado]}
            valor={contarPorEstado(solicitudes, estado)}
            variante={estado.toLowerCase()}
          />
        ))}
      </section>

      {/* LISTADO DE SOLICITUDES */}
      <section className="grilla">
        {solicitudes.length === 0 ? (
          <p className="estado-vacio">
            No hay solicitudes registradas.
          </p>
        ) : (
          solicitudes.map((solicitud) => (
            <SolicitudCard
              key={solicitud.id}
              solicitud={solicitud}
              acciones={
                <div className="tarjeta__acciones">
                  <Boton
                    variante="secundario"
                    onClick={() =>
                      dispatch(
                        registrarAuditoria({
                          accion: 'REVISION',
                          estudiante: solicitud.nombreEstudiante,
                          tramite: solicitud.tipoSolicitud,
                          idSolicitud: solicitud.codigoEstudiante
                        })
                      )
                    }
                  >
                    Auditar
                  </Boton>

                  <Boton
                    onClick={() =>
                      dispatch(
                        registrarAuditoria({
                          accion: 'APROBADO',
                          estudiante: solicitud.nombreEstudiante,
                          tramite: solicitud.tipoSolicitud,
                          idSolicitud: solicitud.codigoEstudiante
                        })
                      )
                    }
                  >
                    Aprobar
                  </Boton>
                </div>
              }
            />
          ))
        )}
      </section>
    </>
  );
}

export default HomePage;
