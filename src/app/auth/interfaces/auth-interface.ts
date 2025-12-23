export interface LoginResponse {
  message: string;
  status: number;
  token: string;
  user: Usuario;
}

export interface Usuario {
  email: string;
  id: number;
  nameuser: string;
  rol: string;
  tiene_foto: boolean;
  foto_url: string;
}


