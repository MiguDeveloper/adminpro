import { Hospital } from './../models/hospital.model';

export interface HospitalesResp {
  isSuccess: boolean;
  isWarning: boolean;
  message: string;
  data: Hospital[];
}

export interface HospitalUpdateReq {
  nombre: string;
}

export interface HospitalUpdateResp {
  isSuccess: boolean;
  isWarning: boolean;
  message: string;
  data: Hospital;
}

export interface HospitalDeleteResp {
  isSuccess: boolean;
  isWarning: boolean;
  message: string;
}
