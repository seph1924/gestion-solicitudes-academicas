
import { useState } from 'react';

import SolicitudCard from '../components/ui/SolicitudCard';
import Boton from '../components/ui/Boton';
import EstadoVacio from '../components/ui/EstadoVacio';

import { ESTADOS_SOLICITUD } from '../data/solicitudes';
import { ETIQUETAS_ESTADO } from '../utils/formato';

function Solicitudes({
  solicitudes,
  eliminarSolicitud,
  cambiarEstado
}) {

  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('TODOS');

  const solicitudesFiltradas = solicitudes.filter((s) => {

    const texto = busqueda.toLowerCase();

    const coincideBusqueda = [
      s.nombreEstudiante,
      s.codigoEstudiante,
      s.tipoSolicitud,
      s.motivo
    ].join(' ').toLowerCase().includes(texto);

    const coincideEstado =
      filtro === 'TODOS' || s.estado === filtro;

    return coincideBusqueda && coincideEstado;
  });

  return (
    <section>

      <h1>Listado de solicitudes</h1>

      <input
        type="search"
        placeholder="Buscar por nombre o código..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <select
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      >
        <option value="TODOS">Todos los estados</option>

        {ESTADOS_SOLICITUD.map((estado) => (
          <option key={estado} value={estado}>
            {ETIQUETAS_ESTADO[estado]}
          </option>
        ))}
      </select>

      <div className="grilla">

        {solicitudesFiltradas.length > 0 ? (

          solicitudesFiltradas.map((solicitud) => (

            <SolicitudCard
              key={solicitud.id}
              solicitud={solicitud}
              acciones={
                <>
                  <select
                    value={solicitud.estado}
                    onChange={(e) =>
                      cambiarEstado(
                        solicitud.id,
                        e.target.value
                      )
                    }
                  >
                    {ESTADOS_SOLICITUD.map((estado) => (
                      <option key={estado} value={estado}>
                        {ETIQUETAS_ESTADO[estado]}
                      </option>
                    ))}
                  </select>

                  <Boton
                    variante="peligro"
                    onClick={() =>
                      eliminarSolicitud(solicitud.id)
                    }
                  >
                    Eliminar
                  </Boton>
                </>
              }
            />

          ))

        ) : (

          <EstadoVacio mensaje="No se encontraron solicitudes." />

        )}

      </div>

    </section>
  );
}

export default Solicitudes;
