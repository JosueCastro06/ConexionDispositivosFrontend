import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ConnectionModule} from './connection/connection.module';
import {DeviceModule} from './device/device.module';
import {HomeModule} from './home/home.module';
import {HistoricModule} from './historic/historic.module';

// eslint-disable-next-line new-cap
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    ConnectionModule,
    DeviceModule,
    HistoricModule,
  ],
  bootstrap: [AppComponent],
})
// eslint-disable-next-line require-jsdoc
export class AppModule { }
