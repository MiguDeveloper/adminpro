import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from './../../services/usuario.service';
import { ValidadoresService } from './../../services/validadores.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formRegistro: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validadoresService: ValidadoresService,
    private usuarioService: UsuarioService
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {}

  get password2Field() {
    return this.formRegistro.get('password2');
  }

  crearFormulario() {
    this.formRegistro = this.fb.group(
      {
        nombre: ['', Validators.required],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
          ],
        ],
        password: ['', Validators.required],
        password2: ['', Validators.required],
        terminos: ['', Validators.required],
      },
      {
        validators: this.validadoresService.passwordIguales(
          'password',
          'password2'
        ),
      }
    );
  }

  validacionControl(nameControl: string): boolean {
    return (
      this.formRegistro.get(nameControl).invalid &&
      this.formRegistro.get(nameControl).touched
    );
  }

  registrar() {
    if (this.formRegistro.valid && this.formRegistro.get('terminos').value) {
      this.usuarioService.crearUsuario(this.formRegistro.value).subscribe(
        (rpta) => {
          if (rpta.isSuccess) {
            if (!rpta.isWarning) {
              localStorage.setItem('token', rpta.token);
              console.log(rpta);
            }
          }
        },
        (error) => {
          Swal.fire('Error', error.error.message, 'error');
        }
      );
    } else {
      console.log('falta aceptar terminos');
      console.log(this.formRegistro);
      this.formRegistro.markAllAsTouched();
    }
  }
}
