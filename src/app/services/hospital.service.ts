import { Hospital } from './../models/hospital.model';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HospitalDeleteResp,
  HospitalesResp,
  HospitalUpdateReq,
  HospitalUpdateResp,
} from '../interfaces/hospitales-resp.interface';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  urlHospitales = `${base_url}/hospitales`;
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  constructor(private httpClient: HttpClient) {}

  get getToken() {
    return localStorage.getItem('token');
  }
  agregarHeaderToken() {
    return this.httpHeaders.append('x-token', this.getToken);
  }

  cargarUsuarios(): Observable<HospitalesResp> {
    return this.httpClient.get<HospitalesResp>(this.urlHospitales, {
      headers: this.agregarHeaderToken(),
    });
  }

  crearHospital(hospital: HospitalUpdateReq): Observable<HospitalUpdateResp> {
    return this.httpClient.post<HospitalUpdateResp>(
      this.urlHospitales,
      hospital,
      { headers: this.agregarHeaderToken() }
    );
  }

  actualizarHospital(
    hospital: HospitalUpdateReq,
    id: string
  ): Observable<HospitalUpdateResp> {
    return this.httpClient.put<HospitalUpdateResp>(
      `${this.urlHospitales}/${id}`,
      hospital,
      { headers: this.agregarHeaderToken() }
    );
  }

  eliminarHospital(id: string): Observable<HospitalDeleteResp> {
    return this.httpClient.delete<HospitalDeleteResp>(
      `${this.urlHospitales}/${id}`,
      { headers: this.agregarHeaderToken() }
    );
  }
}
