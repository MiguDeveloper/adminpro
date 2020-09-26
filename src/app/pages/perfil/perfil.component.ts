import { FileUploadService } from './../../services/file-upload.service';
import Swal from 'sweetalert2';
import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from './../../services/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  formPerfil: FormGroup;
  usuario: Usuario;
  fotoSeleccionada: File;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
  }

  seleccionarFoto(event: any) {
    this.fotoSeleccionada = event.target.files[0];
  }

  subirFoto() {
    if (this.fotoSeleccionada) {
      this.fileUploadService
        .actualizarFoto(this.fotoSeleccionada, 'usuarios', this.usuario.uid)
        .then((img) => {
          this.usuario.img = img;
          console.log(img);
        });
    } else {
      Swal.fire('Error', 'Debe seleccionar una imagen', 'error');
    }
  }

  crearFormulario() {
    this.usuario = this.usuarioService.usuario;
    this.formPerfil = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [
        this.usuario.email,
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
    });
  }

  validacionControl(nameControl: string) {
    return (
      this.formPerfil.get(nameControl).invalid &&
      this.formPerfil.get(nameControl).touched
    );
  }

  actualizarPerfil() {
    if (this.formPerfil.valid) {
      this.usuarioService
        .actualizarUsuario(this.formPerfil.value)
        .subscribe((rpta) => {
          if (rpta.isSuccess) {
            if (!rpta.isWarning) {
              const { nombre, email } = rpta.data;
              this.usuario.nombre = nombre;
              this.usuario.email = email;
              Swal.fire('Correcto', rpta.message, 'success');
            }
          }
        });
    } else {
      this.formPerfil.markAllAsTouched();
    }
  }

  get getTextFieldEmail() {
    return this.formPerfil.get('email');
  }
}
