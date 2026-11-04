
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import PageHeader from './components/ui/PageHeader';
import Boton from './components/ui/Boton';

import useSolicitudes from './hooks/useSolicitudes';

// LISTADO DE SOLICITUDES
function SolicitudesPage({ solicitudes, cambiarEstado }) {
  const [filtro, setFiltro] = useState('TODOS');

  const filtradas = solicitudes.filter((s) =>
    filtro === 'TODOS' || s.estado === filtro
  );

  return (
    <section>
      <PageHeader
        titulo="Solicitudes académicas"
        subtitulo="Consulta y administra las solicitudes registradas."
      />

      <div className="formulario-grupo" style={{ maxWidth: '300px' }}>
        <label>Filtrar por estado</label>

        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        >
          <option value="TODOS">Todos</option>
          <option value="PENDIENTE">Pendiente</option>
          <option value="EN_PROCESO">En proceso</option>
          <option value="APROBADO">Aprobado</option>
          <option value="RECHAZADO">Rechazado</option>
        </select>
      </div>

      <section className="grilla">
        {filtradas.length === 0 ? (
          <p className="estado-vacio">
            No hay solicitudes para este estado.
          </p>
        ) : (
          filtradas.map((s) => (
            <article className="tarjeta" key={s.id}>
              <span className="tarjeta__tipo">
                {s.tipoSolicitud}
              </span>

              <h3 className="tarjeta__titulo">
                {s.nombreEstudiante}
              </h3>

              <p className="tarjeta__codigo">
                {s.codigoEstudiante}
              </p>

              <p className="tarjeta__motivo">
                {s.motivo}
              </p>

              <div className="tarjeta__pie">
                <span>
                  {new Date(s.fechaCreacion).toLocaleDateString()}
                </span>

                <span className={`badge badge--${s.estado.toLowerCase()}`}>
                  {s.estado.replace('_', ' ')}
                </span>
              </div>

              <div className="formulario-grupo">
                <label>Actualizar estado</label>

                <select
                  value={s.estado}
                  onChange={(e) =>
                    cambiarEstado(s.id, e.target.value)
                  }
                >
                  <option value="PENDIENTE">Pendiente</option>
                  <option value="EN_PROCESO">En proceso</option>
                  <option value="APROBADO">Aprobado</option>
                  <option value="RECHAZADO">Rechazado</option>
                </select>
              </div>
            </article>
          ))
        )}
      </section>
    </section>
  );
}

// FORMULARIO DE NUEVA SOLICITUD
function NuevaSolicitudPage({ registrarSolicitud }) {
  const [formulario, setFormulario] = useState({
    codigoEstudiante: '',
    nombreEstudiante: '',
    tipoSolicitud: '',
    motivo: ''
  });

  const navegarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    registrarSolicitud(formulario);

    alert('¡Solicitud registrada correctamente!');

    setFormulario({
      codigoEstudiante: '',
      nombreEstudiante: '',
      tipoSolicitud: '',
      motivo: ''
    });
  };

  return (
    <section>
      <PageHeader
        titulo="Nueva solicitud"
        subtitulo="Complete los datos para registrar su solicitud académica."
      />

      <form
        className="formulario-solicitud"
        onSubmit={manejarEnvio}
      >
        <div className="formulario-grupo">
          <label>Código de estudiante</label>

          <input
            type="text"
            name="codigoEstudiante"
            value={formulario.codigoEstudiante}
            onChange={navegarCambio}
            placeholder="Ejemplo: U20230145"
            required
          />
        </div>

        <div className="formulario-grupo">
          <label>Nombre del estudiante</label>

          <input
            type="text"
            name="nombreEstudiante"
            value={formulario.nombreEstudiante}
            onChange={navegarCambio}
            placeholder="Ingrese su nombre completo"
            required
          />
        </div>

        <div className="formulario-grupo">
          <label>Tipo de solicitud</label>

          <select
            name="tipoSolicitud"
            value={formulario.tipoSolicitud}
            onChange={navegarCambio}
            required
          >
            <option value="">Seleccione una solicitud</option>
            <option value="Rectificación de Nota">
              Rectificación de Nota
            </option>
            <option value="Reserva de Matrícula">
              Reserva de Matrícula
            </option>
            <option value="Carta de Presentación">
              Carta de Presentación
            </option>
            <option value="Examen Extemporáneo">
              Examen Extemporáneo
            </option>
          </select>
        </div>

        <div className="formulario-grupo">
          <label>Motivo de la solicitud</label>

          <textarea
            name="motivo"
            value={formulario.motivo}
            onChange={navegarCambio}
            placeholder="Explique detalladamente el motivo de su solicitud..."
            required
          />

          <span className="formulario-ayuda">
            Describa claramente el motivo de su solicitud.
          </span>
        </div>

        <div className="formulario-acciones">
          <Boton
            variante="secundario"
            type="button"
            onClick={() => window.history.back()}
          >
            Cancelar
          </Boton>

          <Boton type="submit">
            Registrar solicitud
          </Boton>
        </div>
      </form>
    </section>
  );
}

// RESUMEN
function ResumenPage({ solicitudes }) {
  return (
    <section>
      <PageHeader
        titulo="Resumen de solicitudes"
        subtitulo="Consulta el resumen general de las solicitudes."
      />

      <section className="grilla-stats">
        <div className="stat">
          <span className="stat__valor">
            {solicitudes.length}
          </span>
          <span className="stat__titulo">Total de solicitudes</span>
        </div>

        {['PENDIENTE', 'EN_PROCESO', 'APROBADO', 'RECHAZADO'].map(
          (estado) => (
            <div className={`stat stat--${estado.toLowerCase()}`} key={estado}>
              <span className="stat__valor">
                {solicitudes.filter(s => s.estado === estado).length}
              </span>
              <span className="stat__titulo">
                {estado.replace('_', ' ')}
              </span>
            </div>
          )
        )}
      </section>
    </section>
  );
}

// APLICACIÓN PRINCIPAL
function App() {
  const {
    solicitudes,
    registrarSolicitud,
    cambiarEstado
  } = useSolicitudes();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route
          index
          element={<HomePage solicitudes={solicitudes} />}
        />

        <Route
          path="solicitudes"
          element={
            <SolicitudesPage
              solicitudes={solicitudes}
              cambiarEstado={cambiarEstado}
            />
          }
        />

        <Route
          path="nueva-solicitud"
          element={
            <NuevaSolicitudPage
              registrarSolicitud={registrarSolicitud}
            />
          }
        />

        <Route
          path="resumen"
          element={
            <ResumenPage solicitudes={solicitudes} />
          }
        />

      </Route>
    </Routes>
  );
}

export default App;
