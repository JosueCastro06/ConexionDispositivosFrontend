/* eslint-disable require-jsdoc */
import {Component, OnInit} from '@angular/core';
import {DeviceService} from 'src/app/device/services/device.service';
import {HistoricService} from '../../services/historic.service';
// eslint-disable-next-line max-len
import {ConnectionService} from '../../../connection/services/connection.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Device} from 'src/app/device/interfaces/device';
import {Connection} from 'src/app/connection/interfaces/connection';
import {Historic} from '../../../device/interfaces/historic';
import {NgForm} from '@angular/forms';
import {DevCon} from '../../interfaces/connection-device';
import Swal from 'sweetalert2';

// eslint-disable-next-line new-cap
@Component({
  selector: 'app-historic-d-c',
  templateUrl: './historic-d-c.component.html',
  styles: [
  ],
})
export class HistoricDCComponent implements OnInit {
  public historics: Historic[] = [];
  public devices: Device[] = [];
  public connections: Connection[] = [];
  public devcon: DevCon | undefined;

  constructor(private historicService: HistoricService,
    private deviceService: DeviceService,
    private connectionService: ConnectionService) { }

  ngOnInit(): void {
    this.getHistoric();
    this.getDevices();
    this.getConnections();
  }

  public getHistoric(): void {
    this.historicService.getHistoric().subscribe({
      next: (response: Historic[]) => {
        this.historics = response;
        console.log(response);
      },
      error: (err: HttpErrorResponse) => {
        const e = JSON.stringify(err.error);
        console.log(e);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: e,
        });
      },
    },
    );
  }

  public getDevices(): void {
    this.deviceService.getDevices().subscribe({
      next: (response: Device[]) => {
        this.devices = response;
        console.log(response);
      },
      error: (err: HttpErrorResponse) => {
        const e = JSON.stringify(err.error);
        console.log(e);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: e,
        });
      },
    },
    );
  }

  public getConnections(): void {
    this.connectionService.getConnections().subscribe({
      next: (response: Connection[]) => {
        this.connections = response;
        console.log(response);
      },
      error: (err: HttpErrorResponse) => {
        const e = JSON.stringify(err.error);
        console.log(e);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: e,
        });
      },
    },
    );
  }

  public filter(mode: string): void {
    if (mode === 'dev') {
      console.log('selecciono devices');
      document.getElementById('selectHisDev')?.removeAttribute('hidden');
      document.getElementById('selectHisCon')?.setAttribute('hidden', 'hidden');
    }

    if (mode === 'con') {
      console.log('selecciono connections');
      document.getElementById('selectHisCon')?.removeAttribute('hidden');
      document.getElementById('selectHisDev')?.setAttribute('hidden', 'hidden');
    }
  }

  public selFilter(selForm: NgForm): void {
    console.log(selForm.value);


    for (let i = 0; i < this.historics.length; i++) {
      if (selForm.value.idDevice[0] == this.historics[i].id_device) {
        document.getElementById('tableDevice')?.removeAttribute('hidden');
        // eslint-disable-next-line max-len
        document.getElementById('tableConnection')?.setAttribute('hidden', 'hidden');

        const tablaHistoricoDis =
        `<tr>
          <td>${this.historics[i].mac}</td>
          <td>${this.historics[i].type_device}</td>
          <td>${this.historics[i].name}</td>
          <td>
            ${(this.historics[i].type_connection) == '2' ? 'LAN' : 'Wifi'}
          </td>
          <td>
            ${(this.historics[i].encryption) != '' ?
              this.historics[i].encryption : 'X'}
          </td>
        </tr>`;

        document.getElementById('dataDevice')!.innerHTML = tablaHistoricoDis;
      }

      if (selForm.value.idConnection[0] == this.historics[i].id_connection) {
        document.getElementById('tableConnection')?.removeAttribute('hidden');
        // eslint-disable-next-line max-len
        document.getElementById('tableDevice')?.setAttribute('hidden', 'hidden');

        const tablaHistoricoCon =
        `<tr>
          <td>${this.historics[i].name}</td>
          <td>${this.historics[i].ip}</td>
          <td>${this.historics[i].mac}</td>
          <td>${this.historics[i].type_device}</td>
        </tr>`;

        // eslint-disable-next-line max-len
        document.getElementById('dataConnection')!.innerHTML = tablaHistoricoCon;
      }
    }
  }
}
