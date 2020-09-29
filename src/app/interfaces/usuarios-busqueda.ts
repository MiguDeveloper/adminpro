import { Usuario } from './../models/usuario.model';
export interface UsuariosBusqueda {
  isSuccess: boolean;
  isWarning: boolean;
  message: string;
  data: Usuario[];
}
