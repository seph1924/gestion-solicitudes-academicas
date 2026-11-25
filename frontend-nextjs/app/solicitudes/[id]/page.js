
import { notFound } from "next/navigation";
import { solicitudes } from "../../../data/solicitudes";

export function generateStaticParams() {
  return solicitudes.map((solicitud) => ({
    id: solicitud.id,
  }));
}

export default async function DetalleSolicitud({ params }) {
  const { id } = await params;

  const solicitud = solicitudes.find(
    (item) => item.id === id
  );

  if (!solicitud) {
    notFound();
  }

  return (
    <main className="contenedor-solicitudes">
      <h1>Detalle de solicitud</h1>

      <article className="tarjeta-solicitud">
        <div>
          <h2>{solicitud.tipoSolicitud}</h2>
          <p><strong>ID:</strong> {solicitud.id}</p>
          <p><strong>Estudiante:</strong> {solicitud.nombreEstudiante}</p>
          <p><strong>Código:</strong> {solicitud.codigoEstudiante}</p>
          <p><strong>Motivo:</strong> {solicitud.motivo}</p>
          <p><strong>Estado:</strong> {solicitud.estado}</p>
        </div>
      </article>

      <a href="/solicitudes">Volver al listado</a>
    </main>
  );
}
