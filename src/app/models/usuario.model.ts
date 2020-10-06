import { TablaColeccion } from 'src/app/utils/enumeradores';
import { environment } from './../../environments/environment';
const base_url = environment.base_url;

export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: string,
    // tslint:disable-next-line: variable-name
    public _id?: string
  ) {}
}
