import { TablaColeccion } from 'src/app/utils/enumeradores';
import { environment } from './../../environments/environment';
const base_url = environment.base_url;

// tslint:disable-next-line: class-name
interface _HospitalUser {
  _id: string;
  nombre: string;
  email: string;
}
export class Hospital {
  constructor(
    public nombre: string,
    public usuario?: _HospitalUser,
    public img?: string,
    // tslint:disable-next-line: variable-name
    public _id?: string
  ) {}
}
