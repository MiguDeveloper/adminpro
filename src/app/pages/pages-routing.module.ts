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
