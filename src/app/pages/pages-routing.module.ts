import { RoleGuard } from './../guards/role.guard';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AuthGuard } from './../guards/auth.guard';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PromesaComponent } from './promesa/promesa.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PagesComponent } from './pages.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { titulo: 'Dashboard' },
      },
      {
        path: 'account-setting',
        component: AccountSettingsComponent,
        data: { titulo: 'Ajustes tema' },
      },
      {
        path: 'grafica1',
        component: Grafica1Component,
        data: { titulo: 'Graficos' },
      },
      {
        path: 'profile',
        component: PerfilComponent,
        data: { titulo: 'Perfil' },
      },
      {
        path: 'buscar/:termino',
        component: BusquedaComponent,
        data: { titulo: 'busquedas' },
      },
      // Mantenimientos
      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [RoleGuard],
        data: { titulo: 'Mantenimientos Usuario' },
      },
      {
        path: 'medicos',
        component: MedicosComponent,
        data: { titulo: 'Mantenimientos Medicos' },
      },
      {
        path: 'medico/:id',
        component: MedicoComponent,
        data: { titulo: 'Mantenimientos Medico' },
      },
      {
        path: 'hospitales',
        component: HospitalesComponent,
        data: { titulo: 'Mantenimientos Hospital' },
      }, // Fin mantenimiento
      {
        path: 'progress',
        component: ProgressComponent,
        data: { titulo: 'Progress Bar' },
      },
      {
        path: 'promesa',
        component: PromesaComponent,
        data: { titulo: 'Promesas' },
      },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
      { path: '**', component: NotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
