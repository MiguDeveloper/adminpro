import { Usuario } from './../models/usuario.model';
export interface UsuarioUpdateResponse {
  isSuccess: boolean;
  isWarning: string;
  message: string;
  data: Usuario;
}
