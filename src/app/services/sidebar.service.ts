import { PerfilesUsuarios } from './../utils/enumeradores';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {
          titulo: 'Dashboard',
          url: '/dashboard',
          roleEnable: [PerfilesUsuarios.USER_ROLE, PerfilesUsuarios.ADMIN_ROLE],
        },
        {
          titulo: 'Grafica1',
          url: '/dashboard/grafica1',
          roleEnable: [PerfilesUsuarios.USER_ROLE, PerfilesUsuarios.ADMIN_ROLE],
        },
        {
          titulo: 'ProgresBar',
          url: '/dashboard/progress',
          roleEnable: [PerfilesUsuarios.USER_ROLE, PerfilesUsuarios.ADMIN_ROLE],
        },
        {
          titulo: 'Promesa',
          url: '/dashboard/promesa',
          roleEnable: [PerfilesUsuarios.USER_ROLE, PerfilesUsuarios.ADMIN_ROLE],
        },
        {
          titulo: 'RxJs',
          url: '/dashboard/rxjs',
          roleEnable: [PerfilesUsuarios.USER_ROLE, PerfilesUsuarios.ADMIN_ROLE],
        },
      ],
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {
          titulo: 'Usuario',
          url: '/dashboard/usuarios',
          roleEnable: [PerfilesUsuarios.ADMIN_ROLE],
        },
        {
          titulo: 'Hospitales',
          url: '/dashboard/hospitales',
          roleEnable: [PerfilesUsuarios.USER_ROLE, PerfilesUsuarios.ADMIN_ROLE],
        },
        {
          titulo: 'Médico',
          url: '/dashboard/medicos',
          roleEnable: [PerfilesUsuarios.USER_ROLE, PerfilesUsuarios.ADMIN_ROLE],
        },
      ],
    },
  ];
  constructor() {}
}
