
export default function HomePage() {
  return (
    <main className="contenedor">
      <header className="encabezado">
        <h1>Gestión de Solicitudes Académicas</h1>
        <p>
          Plataforma de consulta y administración de solicitudes
          realizadas por estudiantes.
        </p>
      </header>

      <section className="contenido">
        <h2>Bienvenido</h2>
        <p>
          Desde esta plataforma podrás consultar las solicitudes
          académicas y revisar su estado.
        </p>

        <div className="tarjetas">
          <article className="tarjeta">
            <h3>Consultar solicitudes</h3>
            <p>Visualiza las solicitudes registradas.</p>
          </article>

          <article className="tarjeta">
            <h3>Información académica</h3>
            <p>Conoce los servicios disponibles.</p>
          </article>
        </div>
      </section>

      <footer className="pie">
        <p>Proyecto académico PA4 - Programación Web II</p>
      </footer>
    </main>
  );
}
