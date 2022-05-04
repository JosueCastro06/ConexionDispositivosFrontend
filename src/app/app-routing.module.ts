import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'connection',
    loadChildren: () => import('./connection/connection.module')
        .then((m) => m.ConnectionModule),
  },
  {
    path: 'device',
    loadChildren: () => import('./device/device.module')
        .then((m) => m.DeviceModule),
  },
  {
    path: 'historic',
    loadChildren: () => import('./historic/historic.module')
        .then((m) => m.HistoricModule),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },

];

// eslint-disable-next-line new-cap
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
// eslint-disable-next-line require-jsdoc
export class AppRoutingModule { }
