import { Usuario } from './../models/usuario.model';
import { map } from 'rxjs/operators';
import { TablaColeccion } from './../utils/enumeradores';
import { UsuariosBusqueda } from './../interfaces/usuarios-busqueda';
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
  ): Observable<UsuariosBusqueda> {
    return this.httpClient
      .get<UsuariosBusqueda>(
        `${this.urlBusquedaTodo}/coleccion/${tabla}/${busqueda}`,
        {
          headers: this.agregarHeaderXtoken(),
        }
      )
      .pipe(
        map((resp) => {
          const usuarios = resp.data.map(
            (usuario) =>
              new Usuario(
                usuario.nombre,
                usuario.email,
                '',
                usuario.img,
                usuario.google,
                usuario.role,
                usuario.uid
              )
          );
          console.log(usuarios);
          return {
            isSuccess: resp.isSuccess,
            isWarning: resp.isWarning,
            message: resp.message,
            data: usuarios,
          };
        })
      );
  }
}
