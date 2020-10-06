import { Hospital } from './hospital.model';
import { Usuario } from './usuario.model';
export class Medico {
  nombre: string;
  // tslint:disable-next-line: variable-name
  _id?: string;
  img?: string;
  usuario?: Usuario;
  hospital?: Hospital[];
}
