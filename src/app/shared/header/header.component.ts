import { Router } from '@angular/router';
import { TablaColeccion } from 'src/app/utils/enumeradores';
import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  usuario: Usuario;
  tablaColeccion: TablaColeccion = TablaColeccion.Usuarios;

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario;
  }

  logout() {
    this.usuarioService.logout();
  }
  buscar(termino: string) {
    if (termino?.trim()) {
      this.router.navigate(['/dashboard/buscar', termino.trim()]);
    }
  }
}
