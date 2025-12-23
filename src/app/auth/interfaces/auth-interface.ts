
export namespace LoginResponse {

  export interface Login {
    deportista?: Deportista;
    message: string;
    status: number;
    token: string;
    usuario: Usuario;
  }

  export interface Deportista {
    disciplina_deportiva: string;
    edad: number;
    id: number;
    nacionalidad: string;
    nombre: string;
    telefono: string;
  }

  export interface Usuario {
    email: string;
    id: number;
    nameuser: string;
    rol: string;
    tiene_foto: boolean;
    foto_url: string;
  }

}
