import Swal from 'sweetalert2';
import { BusquedasService } from './../../../services/busquedas.service';
import { Usuario } from './../../../models/usuario.model';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { TablaColeccion } from 'src/app/utils/enumeradores';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  totalUsuarios = 0;
  desde = 0;
  cargando = true;

  constructor(
    private usuarioService: UsuarioService,
    private busquedaService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
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
    if (usuario.uid === this.usuarioService.getUid) {
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
}
