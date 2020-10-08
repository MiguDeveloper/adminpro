import { TablaColeccion } from './../utils/enumeradores';
import {
  BusquedaResponse,
  BusquedaTodoResp,
} from '../interfaces/busqueda-response.interface';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class BusquedasService {
  urlBusquedaTodo = `${base_url}/todo`;
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  constructor(private httpClient: HttpClient) {}

  get getToken() {
    return localStorage.getItem('token') || '';
  }

  agregarHeaderXtoken() {
    return this.httpHeaders.append('x-token', this.getToken);
  }

  buscar(
    tabla: TablaColeccion,
    busqueda: string
  ): Observable<BusquedaResponse> {
    return this.httpClient.get<BusquedaResponse>(
      `${this.urlBusquedaTodo}/coleccion/${tabla}/${busqueda}`,
      {
        headers: this.agregarHeaderXtoken(),
      }
    );
  }

  buscarTodo(termino: string): Observable<BusquedaTodoResp> {
    return this.httpClient.get<BusquedaTodoResp>(
      `${this.urlBusquedaTodo}/${termino}`,
      { headers: this.agregarHeaderXtoken() }
    );
  }
}
