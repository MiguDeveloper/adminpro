import { Usuario } from '../models/usuario.model';

export interface ResponseRegister {
  isSuccess: boolean;
  isWarning: boolean;
  message: string;
  data: Usuario;
  token: string;
}
