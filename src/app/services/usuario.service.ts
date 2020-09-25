import { Router } from '@angular/router';
import { LoginCredenciales } from './../interfaces/login.interface';
import { environment } from './../../environments/environment';
import { ResponseRegister } from './../interfaces/response-register.interface';
import { RegistroForm } from './../interfaces/registro.interface';
import { Observable, of } from 'rxjs';
import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseStandard } from '../interfaces/response-standard.interface';
import { tap, map, catchError } from 'rxjs/operators';
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

  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  agregarHeaderXtoken(token: string) {
    return this.httpHeaders.append('x-token', token);
  }
  crearUsuario(usuarioRegistro: RegistroForm): Observable<ResponseRegister> {
    return this.httpClient.post<ResponseRegister>(
      this.urlUsuario,
      usuarioRegistro
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
    const token = localStorage.getItem('token') || '';
    return this.httpClient
      .get(this.urlLoginRenew, {
        headers: this.agregarHeaderXtoken(token),
      })
      .pipe(
        tap((resp: any) => localStorage.setItem('token', resp.data.token)),
        map((resp) => true),
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
}
