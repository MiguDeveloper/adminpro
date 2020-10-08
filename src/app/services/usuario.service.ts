import { UsuarioDelete } from './../interfaces/usuario-delete';
import { UsuariosResponse } from './../interfaces/usuarios-response';
import { UsuarioUpdateResponse } from './../interfaces/usuario-update-response.interface';
import { UsuarioUpdate } from './../interfaces/usuario-update.interface';
import { Usuario } from './../models/usuario.model';
import { Router } from '@angular/router';
import { LoginCredenciales } from './../interfaces/login.interface';
import { environment } from './../../environments/environment';
import { ResponseRegister } from './../interfaces/response-register.interface';
import { RegistroForm } from './../interfaces/registro.interface';
import { Observable, of } from 'rxjs';
import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseStandard } from '../interfaces/response-standard.interface';
import { map, catchError } from 'rxjs/operators';
const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  urlUsuario = `${base_url}/usuarios`;
  urlLogin = `${base_url}/login`;
  urlLoginGoogle = `${this.urlLogin}/google`;
  urlLoginRenew = `${this.urlLogin}/renew`;

  auth2: any;
  usuario: Usuario;

  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  get getToken() {
    return localStorage.getItem('token') || '';
  }

  get getUid() {
    return this.usuario._id || '';
  }

  get getRoleUser() {
    return this.usuario.role;
  }

  agregarHeaderXtoken() {
    return this.httpHeaders.append('x-token', this.getToken);
  }

  crearUsuario(usuarioRegistro: RegistroForm): Observable<ResponseRegister> {
    return this.httpClient.post<ResponseRegister>(
      this.urlUsuario,
      usuarioRegistro
    );
  }

  actualizarUsuario(
    usuarioUpdate: UsuarioUpdate
  ): Observable<UsuarioUpdateResponse> {
    usuarioUpdate = { ...usuarioUpdate, role: this.usuario.role };
    return this.httpClient.put<UsuarioUpdateResponse>(
      `${this.urlUsuario}/${this.getUid}`,
      usuarioUpdate,
      { headers: this.agregarHeaderXtoken() }
    );
  }

  guardarUsuario(usuarioUpdate: Usuario): Observable<UsuarioUpdateResponse> {
    return this.httpClient.put<UsuarioUpdateResponse>(
      `${this.urlUsuario}/${usuarioUpdate._id}`,
      usuarioUpdate,
      { headers: this.agregarHeaderXtoken() }
    );
  }

  loginUser(
    loginCredenciales: LoginCredenciales
  ): Observable<ResponseStandard> {
    return this.httpClient.post<ResponseStandard>(
      this.urlLogin,
      loginCredenciales
    );
  }

  loginUserConGoogle(token: string): Observable<ResponseStandard> {
    return this.httpClient.post<ResponseStandard>(this.urlLoginGoogle, {
      token,
    });
  }

  validarToken(): Observable<boolean> {
    return this.httpClient
      .get(this.urlLoginRenew, {
        headers: this.agregarHeaderXtoken(),
      })
      .pipe(
        map((resp: any) => {
          const { nombre, email, img, role, google, _id } = resp.data.usuario;
          this.usuario = new Usuario(nombre, email, '', img, google, role, _id);
          localStorage.setItem('token', resp.data.token);
          return true;
        }),
        catchError((error) => of(false))
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigate(['/login']);
      });
    });
  }

  googleInit() {
    return new Promise((resolve) => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id:
            '657197416974-qfa3dq2rgmuhm1fuk1jt4uncttbh5fpa.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }

  cargarUsuarios(desde = 0): Observable<UsuariosResponse> {
    return this.httpClient.get<UsuariosResponse>(
      `${this.urlUsuario}?desde=${desde}`,
      {
        headers: this.agregarHeaderXtoken(),
      }
    );
  }

  eliminarUsuario(usuario: Usuario): Observable<UsuarioDelete> {
    return this.httpClient.delete<UsuarioDelete>(
      `${this.urlUsuario}/${usuario._id}`,
      { headers: this.agregarHeaderXtoken() }
    );
  }
}
