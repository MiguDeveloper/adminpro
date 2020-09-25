import { Router } from '@angular/router';
import { UsuarioService } from './../../services/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, NgZone } from '@angular/core';
import Swal from 'sweetalert2';
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  auth2: any;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.renderButton();
  }

  validacionControl(nameControl: string) {
    return (
      this.formLogin.get(nameControl).touched &&
      this.formLogin.get(nameControl).invalid
    );
  }

  crearFormulario() {
    this.formLogin = this.fb.group({
      email: [
        localStorage.getItem('email') || '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['', Validators.required],
      remember: [false],
    });
  }

  iniciarSesion() {
    if (this.formLogin.valid) {
      this.usuarioService.loginUser(this.formLogin.value).subscribe(
        (rpta) => {
          if (rpta.isSuccess) {
            if (!rpta.isWarning) {
              localStorage.setItem('token', rpta.data);
              if (this.textFieldRemember.value) {
                localStorage.setItem('email', this.textFieldEmail.value);
              } else {
                localStorage.removeItem('email');
              }
              this.router.navigate(['/dashboard']);
            }
          }
        },
        (error) => {
          Swal.fire('Error', error.error.message, 'error');
        }
      );
    } else {
      this.formLogin.markAllAsTouched();
    }
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });
    this.startApp();
  }

  attachSignin(element) {
    console.log(element.id);
    this.auth2.attachClickHandler(
      element,
      {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.usuarioService.loginUserConGoogle(id_token).subscribe(
          (rpta) => {
            if (rpta.isSuccess) {
              if (!rpta.isWarning) {
                localStorage.setItem('token', rpta.data);
                this.ngZone.run(() => {
                  this.router.navigate(['/dashboard']);
                  Swal.fire('Bienvenido', 'acceso correcto', 'success');
                });
              }
            }
          },
          (error) => {
            Swal.fire('Error', error.error.message, 'error');
          }
        );
      },
      (error) => {
        Swal.fire('Error', error, 'error');
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }

  async startApp() {
    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  }

  get textFieldEmail() {
    return this.formLogin.get('email');
  }
  get textFieldRemember() {
    return this.formLogin.get('remember');
  }
}
