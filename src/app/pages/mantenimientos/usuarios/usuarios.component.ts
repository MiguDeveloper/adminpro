import { Subscription } from 'rxjs';
import { ModalImagenService } from './../../../services/modal-imagen.service';
import { PerfilesUsuarios } from './../../../utils/enumeradores';
import Swal from 'sweetalert2';
import { BusquedasService } from './../../../services/busquedas.service';
import { Usuario } from './../../../models/usuario.model';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TablaColeccion } from 'src/app/utils/enumeradores';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  usuarios: Usuario[] = [];
  totalUsuarios = 0;
  desde = 0;
  cargando = true;
  rolesSistema = [PerfilesUsuarios.ADMIN_ROLE, PerfilesUsuarios.USER_ROLE];
  imgSubs: Subscription;
  tablaColeccion: TablaColeccion = TablaColeccion.Usuarios;

  constructor(
    private usuarioService: UsuarioService,
    private busquedaService: BusquedasService,
    private modalImagenService: ModalImagenService
  ) {}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.notificarSubioImagen.subscribe(
      (rpta) => {
        console.log(rpta);
        this.usuarios.find((usuario) =>
          usuario._id === rpta.uid ? (usuario.img = rpta.archivo) : ''
        );
      }
    );
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde).subscribe((rpta) => {
      if (rpta.isSuccess) {
        this.usuarios = rpta.data;
        this.totalUsuarios = rpta.total;
        this.cargando = false;
      }
    });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  buscar(termino: string) {
    if (termino?.trim()) {
      this.busquedaService
        .buscar(TablaColeccion.Usuarios, termino)
        .subscribe((rpta) => {
          if (rpta.isSuccess) {
            this.usuarios = rpta.data;
          }
        });
    }
  }

  eliminarUsuario(usuario: Usuario) {
    if (usuario._id === this.usuarioService.getUid) {
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }
    Swal.fire({
      title: 'Esta seguro?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(usuario);
        this.usuarioService.eliminarUsuario(usuario).subscribe((rpta) => {
          if (rpta.isSuccess) {
            this.cargarUsuarios();
            Swal.fire('Eliminado!', 'El usuario a sido eliminado', 'success');
          }
        });
      }
    });
  }

  cambiarRole(usuario: Usuario) {
    this.usuarioService.guardarUsuario(usuario).subscribe(
      (rpta) => {
        if (rpta.isSuccess) {
          console.log(rpta);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal(
      TablaColeccion.Usuarios,
      usuario._id,
      usuario.img
    );
  }
}
