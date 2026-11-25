
export const metadata = {
  title: "Información académica",
  description: "Información sobre los servicios académicos disponibles.",
};

export default function InformacionPage() {
  return (
    <main className="contenedor-solicitudes">
      <header className="encabezado-solicitudes">
        <h1>Información académica</h1>
        <p>Conoce los servicios disponibles para los estudiantes.</p>
      </header>

      <section className="lista-solicitudes">
        <article className="tarjeta-solicitud">
          <div>
            <h3>Rectificación de notas</h3>
            <p>Solicitud para revisar o corregir calificaciones.</p>
          </div>
        </article>

        <article className="tarjeta-solicitud">
          <div>
            <h3>Reserva de matrícula</h3>
            <p>Trámite para reservar la matrícula del siguiente periodo.</p>
          </div>
        </article>

        <article className="tarjeta-solicitud">
          <div>
            <h3>Examen extemporáneo</h3>
            <p>Solicitud para rendir una evaluación fuera de fecha.</p>
          </div>
        </article>

        <article className="tarjeta-solicitud">
          <div>
            <h3>Carta de presentación</h3>
            <p>Solicitud de documentos para prácticas profesionales.</p>
          </div>
        </article>
      </section>
    </main>
  );
}
