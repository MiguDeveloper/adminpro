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
  ];
  constructor() {}
}
