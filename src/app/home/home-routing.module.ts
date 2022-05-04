import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
  },
];

// eslint-disable-next-line new-cap
@NgModule({
  imports: [
    RouterModule.forChild( routes ),
  ],
})
// eslint-disable-next-line require-jsdoc
export class HomeRoutingModule { }
