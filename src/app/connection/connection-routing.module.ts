import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
// eslint-disable-next-line max-len
import {TableConnectionsComponent} from './pages/table-connections/table-connections.component';

const routes: Routes = [
  {
    path: '',
    component: TableConnectionsComponent,
  },
];

// eslint-disable-next-line new-cap
@NgModule({
  imports: [
    RouterModule.forChild( routes ),
  ],
})
// eslint-disable-next-line require-jsdoc
export class ConnectionRoutingModule { }
