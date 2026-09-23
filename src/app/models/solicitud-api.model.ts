// ============================================================
// Actividad 4: forma "cruda" que devuelve la API publica
// (JSONPlaceholder /users). Se tipa aparte para no mezclarla
// con el modelo del dominio.
// ============================================================

export interface UsuarioApi {
  id: number;
  name: string;
  username: string;
  email: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}
