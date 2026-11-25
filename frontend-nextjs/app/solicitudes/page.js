
import { connection } from "next/server";
import { solicitudes } from "../../data/solicitudes";

export default async function SolicitudesPage() {
  await connection();

  return (
    <main className="contenedor-solicitudes">
      <header className="encabezado-solicitudes">
        <h1>Solicitudes Académicas</h1>
        <p>
          Consulta las solicitudes registradas en la plataforma.
        </p>
      </header>

      <section className="lista-solicitudes">
        <h2>Listado de solicitudes</h2>

        {solicitudes.map((solicitud) => (
          <article
            className="tarjeta-solicitud"
            key={solicitud.id}
          >
            <div>
              <h3>{solicitud.tipoSolicitud}</h3>
              <p><strong>Estudiante:</strong> {solicitud.nombreEstudiante}</p>
              <p><strong>Código:</strong> {solicitud.codigoEstudiante}</p>
              <p><strong>Motivo:</strong> {solicitud.motivo}</p>
            </div>

            <span className="estado-solicitud">
              {solicitud.estado}
            </span>
          </article>
        ))}
      </section>
    </main>
  );
}
