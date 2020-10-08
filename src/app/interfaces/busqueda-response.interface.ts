import { Hospital } from './../models/hospital.model';
import { Medico } from './../models/medico';
import { Usuario } from './../models/usuario.model';
export interface BusquedaResponse {
  isSuccess: boolean;
  isWarning: boolean;
  message: string;
  data: any[];
}

export interface BusquedaTodoResp {
  isSuccess: boolean;
  isWarning: boolean;
  message: string;
  data: DataBusquedaTodo;
}

export interface DataBusquedaTodo {
  usuarios?: Usuario[];
  medicos?: Hospitale[];
  hospitales?: Hospitale[];
}

interface Hospitale {
  _id: string;
  usuario: string;
  nombre: string;
  img?: string;
  hospital?: string[];
}
