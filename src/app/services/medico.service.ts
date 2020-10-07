import { Medico } from './../models/medico';
import {
  MedicoCreateReq,
  MedicoCreateResp,
  MedicoDeleteResp,
  MedicosByIdResp,
} from './../interfaces/medicos-resp';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { MedicosResp } from '../interfaces/medicos-resp';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });
  urlMedicos = `${base_url}/medicos`;

  get getToken() {
    return localStorage.getItem('token') || '';
  }

  agregarHeaderXToken() {
    return this.httpHeaders.append('x-token', this.getToken);
  }

  constructor(private httpClient: HttpClient) {}

  cargarMedicos(): Observable<MedicosResp> {
    return this.httpClient.get<MedicosResp>(this.urlMedicos, {
      headers: this.agregarHeaderXToken(),
    });
  }

  crearMedico(medico: MedicoCreateReq): Observable<MedicoCreateResp> {
    return this.httpClient.post<MedicoCreateResp>(this.urlMedicos, medico, {
      headers: this.agregarHeaderXToken(),
    });
  }

  actualizarMedico(id: string, medico: Medico): Observable<MedicoCreateResp> {
    return this.httpClient.put<MedicoCreateResp>(
      `${this.urlMedicos}/${id}`,
      medico,
      {
        headers: this.agregarHeaderXToken(),
      }
    );
  }

  eliminarMedico(id: string): Observable<MedicoDeleteResp> {
    return this.httpClient.delete<MedicoDeleteResp>(
      `${this.urlMedicos}/${id}`,
      {
        headers: this.agregarHeaderXToken(),
      }
    );
  }

  getMedicoById(id: string): Observable<MedicosByIdResp> {
    return this.httpClient.get<MedicosByIdResp>(`${this.urlMedicos}/${id}`, {
      headers: this.agregarHeaderXToken(),
    });
  }
}
