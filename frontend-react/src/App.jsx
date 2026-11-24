import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';

import PageHeader from './components/ui/PageHeader';
import Boton from './components/ui/Boton';
import EstadoPeticion from './components/ui/EstadoPeticion';
import Aviso from './components/ui/Aviso';

import useSolicitudes from './hooks/useSolicitudes';
import { TIPOS_SOLICITUD } from './data/solicitudes';
import { validarFormularioSolicitud } from './utils/validaciones';
import { formatearFecha, ETIQUETAS_ESTADO } from './utils/formato';

// LISTADO DE SOLICITUDES
function SolicitudesPage({ api }) {
  const {
    cargando,
    error,
    recargar,
    enProceso,
    cambiarEstado,
    eliminarSolicitud,
    filtrarSolicitudes
  } = api;

  const [filtro, setFiltro] = useState('TODOS');
  const [aviso, setAviso] = useState(null);

  const filtradas = filtrarSolicitudes(filtro);

  const manejarCambioEstado = async (id, estado) => {
    setAviso(await cambiarEstado(id, estado));
  };

  const manejarEliminar = async (solicitud) => {
    const confirmar = window.confirm(
      `¿Eliminar la solicitud de ${solicitud.nombreEstudiante}? Esta acción no se puede deshacer.`
    );

    if (!confirmar) return;

    setAviso(await eliminarSolicitud(solicitud.id));
  };

  return (
    <section>
      <PageHeader
        titulo="Solicitudes académicas"
        subtitulo="Consulta y administra las solicitudes registradas."
        accion={
          <Boton variante="secundario" onClick={recargar} disabled={cargando}>
            Actualizar
          </Boton>
        }
      />

      <Aviso aviso={aviso} onCerrar={() => setAviso(null)} />

      <EstadoPeticion cargando={cargando} error={error} onReintentar={recargar}>
        <div
          className="formulario-grupo"
          style={{ maxWidth: '300px', marginBottom: '1rem' }}
        >
          <label htmlFor="filtro-estado">Filtrar por estado</label>

          <select
            id="filtro-estado"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          >
            <option value="TODOS">Todos</option>

            {Object.entries(ETIQUETAS_ESTADO).map(([valor, texto]) => (
              <option key={valor} value={valor}>
                {texto}
              </option>
            ))}
          </select>
        </div>

        <section className="grilla">
          {filtradas.length === 0 ? (
            <p className="estado-vacio">
              No hay solicitudes para este estado.
            </p>
          ) : (
            filtradas.map((s) => {
              const ocupada = enProceso.includes(s.id);

              return (
                <article className="tarjeta" key={s.id} aria-busy={ocupada}>
                  <span className="tarjeta__tipo">{s.tipoSolicitud}</span>

                  <h3 className="tarjeta__titulo">{s.nombreEstudiante}</h3>

                  <p className="tarjeta__codigo">{s.codigoEstudiante}</p>

                  <p className="tarjeta__motivo">{s.motivo}</p>

                  <div className="tarjeta__pie">
                    <span>{formatearFecha(s.fechaCreacion)}</span>

                    <span className={`badge badge--${s.estado.toLowerCase()}`}>
                      {ETIQUETAS_ESTADO[s.estado]}
                    </span>
                  </div>

                  <div className="formulario-grupo">
                    <label htmlFor={`estado-${s.id}`}>
                      Actualizar estado
                    </label>

                    <select
                      id={`estado-${s.id}`}
                      value={s.estado}
                      disabled={ocupada}
                      onChange={(e) =>
                        manejarCambioEstado(s.id, e.target.value)
                      }
                    >
                      {Object.entries(ETIQUETAS_ESTADO).map(([valor, texto]) => (
                        <option key={valor} value={valor}>
                          {texto}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Boton
                    variante="peligro"
                    disabled={ocupada}
                    onClick={() => manejarEliminar(s)}
                  >
                    {ocupada ? 'Procesando…' : 'Eliminar'}
                  </Boton>
                </article>
              );
            })
          )}
        </section>
      </EstadoPeticion>
    </section>
  );
}

// FORMULARIO DE NUEVA SOLICITUD
const FORMULARIO_VACIO = {
  codigoEstudiante: '',
  nombreEstudiante: '',
  tipoSolicitud: '',
  motivo: ''
};

function NuevaSolicitudPage({ registrarSolicitud }) {
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState(FORMULARIO_VACIO);
  const [erroresCampo, setErroresCampo] = useState({});
  const [aviso, setAviso] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setFormulario({ ...formulario, [name]: value });

    if (erroresCampo[name]) {
      setErroresCampo({ ...erroresCampo, [name]: undefined });
    }
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setAviso(null);

    const errores = validarFormularioSolicitud(formulario);

    setErroresCampo(errores);

    if (Object.keys(errores).length > 0) return;

    setEnviando(true);

    const resultado = await registrarSolicitud(formulario);

    setEnviando(false);
    setAviso(resultado);

    if (resultado.ok) {
      setFormulario(FORMULARIO_VACIO);
    }
  };

  const campo = (nombre) => ({
    id: nombre,
    name: nombre,
    value: formulario[nombre],
    onChange: manejarCambio,
    'aria-invalid': Boolean(erroresCampo[nombre]),
    'aria-describedby': erroresCampo[nombre]
      ? `${nombre}-error`
      : undefined
  });

  const errorDe = (nombre) =>
    erroresCampo[nombre] && (
      <span id={`${nombre}-error`} className="formulario-error">
        {erroresCampo[nombre]}
      </span>
    );

  return (
    <section>
      <PageHeader
        titulo="Nueva solicitud"
        subtitulo="Complete los datos para registrar su solicitud académica."
      />

      <Aviso aviso={aviso} onCerrar={() => setAviso(null)} />

      <form className="formulario-solicitud" onSubmit={manejarEnvio} noValidate>
        <div className="formulario-grupo">
          <label htmlFor="codigoEstudiante">Código de estudiante</label>

          <input
            type="text"
            placeholder="Ejemplo: U20230145"
            {...campo('codigoEstudiante')}
          />

          {errorDe('codigoEstudiante')}
        </div>

        <div className="formulario-grupo">
          <label htmlFor="nombreEstudiante">Nombre del estudiante</label>

          <input
            type="text"
            placeholder="Ingrese su nombre completo"
            {...campo('nombreEstudiante')}
          />

          {errorDe('nombreEstudiante')}
        </div>

        <div className="formulario-grupo">
          <label htmlFor="tipoSolicitud">Tipo de solicitud</label>

          <select {...campo('tipoSolicitud')}>
            <option value="">Seleccione una solicitud</option>

            {TIPOS_SOLICITUD.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>

          {errorDe('tipoSolicitud')}
        </div>

        <div className="formulario-grupo">
          <label htmlFor="motivo">Motivo de la solicitud</label>

          <textarea
            placeholder="Explique detalladamente el motivo de su solicitud..."
            maxLength={500}
            {...campo('motivo')}
          />

          {errorDe('motivo') || (
            <span className="formulario-ayuda">
              Describa claramente el motivo de su solicitud (
              {formulario.motivo.length}/500).
            </span>
          )}
        </div>

        <div className="formulario-acciones">
          <Boton
            variante="secundario"
            type="button"
            onClick={() => navigate('/solicitudes')}
          >
            Ver solicitudes
          </Boton>

          <Boton type="submit" disabled={enviando}>
            {enviando ? 'Registrando…' : 'Registrar solicitud'}
          </Boton>
        </div>
      </form>
    </section>
  );
}

// RESUMEN
function ResumenPage({ api }) {
  const { solicitudes, cargando, error, recargar } = api;

  return (
    <section>
      <PageHeader
        titulo="Resumen de solicitudes"
        subtitulo="Consulta el resumen general de las solicitudes."
      />

      <EstadoPeticion cargando={cargando} error={error} onReintentar={recargar}>
        <section className="grilla-stats">
          <div className="stat">
            <span className="stat__valor">{solicitudes.length}</span>
            <span className="stat__titulo">Total de solicitudes</span>
          </div>

          {Object.entries(ETIQUETAS_ESTADO).map(([estado, texto]) => (
            <div className={`stat stat--${estado.toLowerCase()}`} key={estado}>
              <span className="stat__valor">
                {solicitudes.filter((s) => s.estado === estado).length}
              </span>

              <span className="stat__titulo">{texto}</span>
            </div>
          ))}
        </section>
      </EstadoPeticion>
    </section>
  );
}

// APLICACIÓN PRINCIPAL
function App() {
  const api = useSolicitudes();

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />

      {/* Rutas protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage api={api} />} />

          <Route
            path="solicitudes"
            element={<SolicitudesPage api={api} />}
          />

          <Route
            path="nueva-solicitud"
            element={
              <NuevaSolicitudPage
                registrarSolicitud={api.registrarSolicitud}
              />
            }
          />

          <Route
            path="resumen"
            element={<ResumenPage api={api} />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;