import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HomeRoutingModule} from './home-routing.module';


// eslint-disable-next-line new-cap
@NgModule({
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    HomeRoutingModule,
    FontAwesomeModule,
  ],
})
// eslint-disable-next-line require-jsdoc
export class HomeModule { }
