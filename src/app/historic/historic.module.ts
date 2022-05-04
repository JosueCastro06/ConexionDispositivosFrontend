import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HistoricDCComponent} from './pages/historic-d-c/historic-d-c.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HistoricRoutingModule} from './historic-routing.module';


// eslint-disable-next-line new-cap
@NgModule({
  declarations: [
    HistoricDCComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    HistoricRoutingModule,
    FormsModule,
    FontAwesomeModule,
  ],
  bootstrap: [HistoricDCComponent],
})
// eslint-disable-next-line require-jsdoc
export class HistoricModule { }
