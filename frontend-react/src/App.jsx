
import { useState } from 'react';

import Layout from './components/layout/Layout';
import PageHeader from './components/ui/PageHeader';
import StatCard from './components/ui/StatCard';
import SolicitudCard from './components/ui/SolicitudCard';
import Boton from './components/ui/Boton';
import EstadoVacio from './components/ui/EstadoVacio';

import useSolicitudes from './hooks/useSolicitudes';

import {
  TIPOS_SOLICITUD,
  ESTADOS_SOLICITUD
} from './data/solicitudes';

import {
  ETIQUETAS_ESTADO,
  contarPorEstado
} from './utils/formato';

function App() {

  // Control de navegación
  const [vista, setVista] = useState('/');

  // Hook para gestionar las solicitudes
  const {
    solicitudes,
    agregarSolicitud,
    eliminarSolicitud,
    cambiarEstado
  } = useSolicitudes();

  // Estados del formulario y filtros
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('TODOS');

  const [formulario, setFormulario] = useState({
    nombreEstudiante: '',
    codigoEstudiante: '',
    tipoSolicitud: TIPOS_SOLICITUD[0],
    motivo: ''
  });

  // Manejar cambios del formulario
  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value
    }));
  };

  // Registrar una nueva solicitud
  const manejarRegistro = (e) => {
    e.preventDefault();

    if (
      !formulario.nombreEstudiante.trim() ||
      !formulario.codigoEstudiante.trim() ||
      !formulario.motivo.trim()
    ) {
      alert('Completa todos los campos.');
      return;
    }

    agregarSolicitud(formulario);

    setFormulario({
      nombreEstudiante: '',
      codigoEstudiante: '',
      tipoSolicitud: TIPOS_SOLICITUD[0],
      motivo: ''
    });

    alert('Solicitud registrada correctamente.');

    // Después de registrar, ir al listado
    setVista('/solicitudes');
  };

  // Buscar y filtrar solicitudes
  const solicitudesFiltradas = solicitudes.filter((s) => {

    const texto = busqueda.toLowerCase().trim();

    const coincideBusqueda = [
      s.nombreEstudiante,
      s.codigoEstudiante,
      s.tipoSolicitud,
      s.motivo
    ]
      .join(' ')
      .toLowerCase()
      .includes(texto);

    const coincideEstado =
      filtro === 'TODOS' || s.estado === filtro;

    return coincideBusqueda && coincideEstado;
  });

  return (
    <Layout
      onNavegar={setVista}
      vistaActual={vista}
    >

      {/* ================= INICIO ================= */}

      {vista === '/' && (
        <>
          <PageHeader
            titulo="Solicitudes académicas"
            subtitulo="Consulta y organiza las solicitudes registradas por los estudiantes."
            accion={
              <Boton onClick={() => setVista('/nueva-solicitud')}>
                + Nueva solicitud
              </Boton>
            }
          />

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
        </>
      )}

      {/* ================= NUEVA SOLICITUD ================= */}

      {vista === '/nueva-solicitud' && (
        <>
          <PageHeader
            titulo="Nueva solicitud"
            subtitulo="Completa los datos para registrar una solicitud académica."
          />

          <section className="panel-formulario">

            <h2>Registrar nueva solicitud</h2>

            <form onSubmit={manejarRegistro}>

              <label>Nombre del estudiante</label>
              <input
                type="text"
                name="nombreEstudiante"
                value={formulario.nombreEstudiante}
                onChange={manejarCambio}
                placeholder="Ingrese el nombre completo"
                required
              />

              <label>Código del estudiante</label>
              <input
                type="text"
                name="codigoEstudiante"
                value={formulario.codigoEstudiante}
                onChange={manejarCambio}
                placeholder="Ejemplo: U20230145"
                required
              />

              <label>Tipo de solicitud</label>
              <select
                name="tipoSolicitud"
                value={formulario.tipoSolicitud}
                onChange={manejarCambio}
              >
                {TIPOS_SOLICITUD.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>

              <label>Motivo de la solicitud</label>
              <textarea
                name="motivo"
                value={formulario.motivo}
                onChange={manejarCambio}
                placeholder="Describa el motivo de su solicitud"
                required
              />

              <Boton type="submit">
                Registrar solicitud
              </Boton>

            </form>

          </section>
        </>
      )}

      {/* ================= SOLICITUDES ================= */}

      {vista === '/solicitudes' && (
        <>
          <PageHeader
            titulo="Listado de solicitudes"
            subtitulo="Busca, filtra y administra las solicitudes registradas."
            accion={
              <Boton onClick={() => setVista('/nueva-solicitud')}>
                + Nueva solicitud
              </Boton>
            }
          />

          {/* Búsqueda y filtros */}
          <section className="filtros">

            <input
              type="search"
              placeholder="Buscar por nombre, código o tipo..."
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

          </section>

          {/* Listado de solicitudes */}
          <section className="grilla">

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
                        onClick={() => {
                          if (window.confirm('¿Deseas eliminar esta solicitud?')) {
                            eliminarSolicitud(solicitud.id);
                          }
                        }}
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

          </section>
        </>
      )}

      {/* ================= RESUMEN ================= */}

      {vista === '/resumen' && (
        <>
          <PageHeader
            titulo="Resumen de solicitudes"
            subtitulo="Estadísticas generales de las solicitudes académicas."
          />

          <section className="grilla-stats">

            <StatCard
              titulo="Total de solicitudes"
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
        </>
      )}

    </Layout>
  );
}

export default App;