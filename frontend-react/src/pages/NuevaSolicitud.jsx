
import { useState } from 'react';
import { TIPOS_SOLICITUD } from '../data/solicitudes';

function NuevaSolicitud({ agregarSolicitud }) {

  const [formulario, setFormulario] = useState({
    nombreEstudiante: '',
    codigoEstudiante: '',
    tipoSolicitud: TIPOS_SOLICITUD[0],
    motivo: ''
  });

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value
    }));
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (
      !formulario.nombreEstudiante.trim() ||
      !formulario.codigoEstudiante.trim() ||
      !formulario.motivo.trim()
    ) {
      alert('Completa todos los campos');
      return;
    }

    agregarSolicitud(formulario);

    alert('Solicitud registrada correctamente');

    setFormulario({
      nombreEstudiante: '',
      codigoEstudiante: '',
      tipoSolicitud: TIPOS_SOLICITUD[0],
      motivo: ''
    });
  };

  return (
    <section className="panel-formulario">

      <h2>Nueva solicitud académica</h2>

      <form onSubmit={manejarEnvio}>

        <label>Nombre del estudiante</label>
        <input
          type="text"
          name="nombreEstudiante"
          value={formulario.nombreEstudiante}
          onChange={manejarCambio}
          placeholder="Ingrese su nombre completo"
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

        <button type="submit">
          Registrar solicitud
        </button>

      </form>

    </section>
  );
}

export default NuevaSolicitud;
