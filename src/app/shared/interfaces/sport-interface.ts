
export namespace SportApi {



  export interface SportResponse {
    deportista: Deportista;
    message: string;
    status: number;
  }

  export interface Deportista {
    disciplina_deportiva: string;
    edad: number;
    id: number;
    nacionalidad: string;
    nombre: string;
    telefono: string;
    usuario_id: number;
  }

}
