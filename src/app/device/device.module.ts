import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DeviceRoutingModule} from './device-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

// eslint-disable-next-line max-len
import {TableDevicesComponent} from './pages/table-devices/table-devices.component';


// eslint-disable-next-line new-cap
@NgModule({
  declarations: [TableDevicesComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    DeviceRoutingModule,
    FormsModule,
    FontAwesomeModule,
  ],
  bootstrap: [TableDevicesComponent],
})
// eslint-disable-next-line require-jsdoc
export class DeviceModule { }
