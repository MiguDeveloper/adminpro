import { Usuario } from './../models/usuario.model';
import { Hospital } from './../models/hospital.model';
export interface MedicosResp {
  isSuccess: boolean;
  isWarning: boolean;
  message: string;
  data: MedicosData[];
}

interface MedicosData {
  _id: string;
  usuario: Usuario;
  nombre: string;
  hospital?: Hospital[];
  img?: string;
}

export interface MedicoCreateResp {
  isSuccess: boolean;
  isWarning: boolean;
  message: string;
  data: Usuario;
}

export interface MedicoDeleteResp {
  isSuccess: boolean;
  isWarning: boolean;
  message: string;
}
