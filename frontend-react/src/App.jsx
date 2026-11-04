
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';

function SolicitudesPage() {
  return (
    <section>
      <h1>Solicitudes académicas</h1>
      <p>Consulta las solicitudes registradas por los estudiantes.</p>
    </section>
  );
}

function NuevaSolicitudPage() {
  return (
    <section>
      <h1>Nueva solicitud</h1>
      <p>Formulario de registro de solicitudes académicas.</p>
    </section>
  );
}

function ResumenPage() {
  return (
    <section>
      <h1>Resumen de solicitudes</h1>
      <p>Consulta el resumen general de las solicitudes.</p>
    </section>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="solicitudes" element={<SolicitudesPage />} />
        <Route path="nueva-solicitud" element={<NuevaSolicitudPage />} />
        <Route path="resumen" element={<ResumenPage />} />
      </Route>
    </Routes>
  );
}

export default App;
