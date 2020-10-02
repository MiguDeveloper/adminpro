import { TablaColeccion } from './../../utils/enumeradores';
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
  imgTemp: any;

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
    if (!this.fotoSeleccionada) {
      return (this.imgTemp = null);
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.fotoSeleccionada);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  subirFoto() {
    if (this.fotoSeleccionada) {
      this.fileUploadService
        .actualizarFoto(
          this.fotoSeleccionada,
          TablaColeccion.Usuarios,
          this.usuario.uid
        )
        .then((data) => {
          this.usuario.img = data.data.archivo;
          Swal.fire('Correcto', data.message, 'success');
        })
        .catch((error) => {
          Swal.fire('Error', error.error.message, 'error');
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
      this.usuarioService.actualizarUsuario(this.formPerfil.value).subscribe(
        (rpta) => {
          if (rpta.isSuccess) {
            if (!rpta.isWarning) {
              const { nombre, email } = rpta.data;
              this.usuario.nombre = nombre;
              this.usuario.email = email;
              Swal.fire('Correcto', rpta.message, 'success');
            }
          }
        },
        (error) => {
          Swal.fire('Error', error.error.message, 'error');
        }
      );
    } else {
      this.formPerfil.markAllAsTouched();
    }
  }

  get getTextFieldEmail() {
    return this.formPerfil.get('email');
  }
}
