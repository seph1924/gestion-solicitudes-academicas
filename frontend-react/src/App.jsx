import Layout from './components/layout/Layout';
import PageHeader from './components/ui/PageHeader';
import StatCard from './components/ui/StatCard';
import SolicitudCard from './components/ui/SolicitudCard';
import Boton from './components/ui/Boton';
import { solicitudesIniciales, ESTADOS_SOLICITUD } from './data/solicitudes';
import { ETIQUETAS_ESTADO, contarPorEstado } from './utils/formato';

// Vista provisional que muestra los componentes visuales de la Persona 1.
// Persona 3 reemplazará este contenido por las rutas (React Router) y
// Persona 2 moverá los datos a useState/useEffect.
function App() {
  return (
    <Layout>
      <PageHeader
        titulo="Solicitudes académicas"
        subtitulo="Consulta y organiza las solicitudes registradas por los estudiantes."
        accion={<Boton>+ Nueva solicitud</Boton>}
      />

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
            acciones={<Boton variante="secundario">Ver detalle</Boton>}
          />
        ))}
      </section>
    </Layout>
  );
}

export default App;
