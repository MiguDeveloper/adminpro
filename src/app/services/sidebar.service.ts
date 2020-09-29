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
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'Grafica1', url: '/dashboard/grafica1' },
        { titulo: 'ProgresBar', url: '/dashboard/progress' },
        { titulo: 'Promesa', url: '/dashboard/promesa' },
        { titulo: 'RxJs', url: '/dashboard/rxjs' },
      ],
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuario', url: '/dashboard/usuarios' },
        { titulo: 'Hospitales', url: '/dashboard/hospitales' },
        { titulo: 'Médico', url: '/dashboard/medicos' },
      ],
    },
  ];
  constructor() {}
}
