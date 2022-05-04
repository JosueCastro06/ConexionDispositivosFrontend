import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HistoricDCComponent} from './pages/historic-d-c/historic-d-c.component';

const routes: Routes = [
  {
    path: '',
    component: HistoricDCComponent,
  },
];

// eslint-disable-next-line new-cap
@NgModule({
  imports: [
    RouterModule.forChild( routes ),
  ],
})
// eslint-disable-next-line require-jsdoc
export class HistoricRoutingModule { }
