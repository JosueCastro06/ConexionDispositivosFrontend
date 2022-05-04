import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
// eslint-disable-next-line max-len
import {TableDevicesComponent} from './pages/table-devices/table-devices.component';

const routes: Routes = [
  {
    path: '',
    component: TableDevicesComponent,
  },
];

// eslint-disable-next-line new-cap
@NgModule({
  imports: [
    RouterModule.forChild( routes ),
  ],
})
// eslint-disable-next-line require-jsdoc
export class DeviceRoutingModule { }
