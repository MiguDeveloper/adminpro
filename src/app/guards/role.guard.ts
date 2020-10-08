import { PerfilesUsuarios } from './../utils/enumeradores';
import { UsuarioService } from './../services/usuario.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.usuarioService.getRoleUser === PerfilesUsuarios.ADMIN_ROLE) {
      return true;
    }
    Swal.fire('Error', 'Acceso no permitido', 'warning');
    this.router.navigate(['/dashboard']);
    return false;
  }
}
