import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ConnectionRoutingModule} from './connection-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule} from '@angular/forms';

// eslint-disable-next-line max-len
import {TableConnectionsComponent} from './pages/table-connections/table-connections.component';


// eslint-disable-next-line new-cap
@NgModule({
  declarations: [
    TableConnectionsComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ConnectionRoutingModule,
    FormsModule,
    FontAwesomeModule,
  ],
  bootstrap: [TableConnectionsComponent],
})

// eslint-disable-next-line require-jsdoc
export class ConnectionModule { }
