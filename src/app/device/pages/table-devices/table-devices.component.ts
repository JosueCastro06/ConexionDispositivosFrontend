/* eslint-disable require-jsdoc */
import {Component, OnInit} from '@angular/core';
import {Device} from '../../interfaces/device';
import {DeviceService} from '../../services/device.service';
import {HttpErrorResponse} from '@angular/common/http';
import {faTrash, faPen} from '@fortawesome/free-solid-svg-icons';
import {NgForm} from '@angular/forms';
import {Connection} from '../../../connection/interfaces/connection';
// eslint-disable-next-line max-len
import {ConnectionService} from '../../../connection/services/connection.service';
import {Historic} from 'src/app/device/interfaces/historic';
import Swal from 'sweetalert2';

// eslint-disable-next-line new-cap
@Component({
  selector: 'app-table-devices',
  templateUrl: './table-devices.component.html',
  styles: [
  ],
})
export class TableDevicesComponent implements OnInit {
  faTrash = faTrash;
  faPen = faPen;
  public id!: number;
  public devices: Device[] = [];
  public connections: Connection[] = [];
  public historics: Historic[] = [];
  public historic!: Historic;
  public his = JSON.parse(localStorage.getItem('idsHis')!);
  public editDevice: Device | undefined;
  public delDevice: Device | undefined;

  constructor(private deviceService: DeviceService,
    private connectionService: ConnectionService) { }

  ngOnInit(): void {
    this.getDevices();
    this.getConnections();
    this.addHistoric();
  }

  public getDevices(): void {
    this.deviceService.getDevices().subscribe({
      next: (response: Device[]) => {
        this.devices = response;

        localStorage.setItem('idsHis', JSON.stringify(response));

        if (response.length == 0) {
          setTimeout(() => {
            document.getElementById('alerta')?.removeAttribute('hidden');
          }, 3000);
        } else if (response.length > 0) {
          document.getElementById('alerta')?.remove();
        }

        console.log(this.devices);
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
        console.log(this.connections);
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

  public addDevice(addForm: NgForm): void {
    document.getElementById('btnAgregarD')?.click();
    (addForm.value.connected === '') ?
      addForm.value.connected = false : addForm.value.connected = true;
    (addForm.value.connection === '1') ?
      addForm.value.connection = 1 :
        addForm.value.connection = addForm.value.connection;

    for (let i = 0; i < this.connections.length; i++) {
      if (addForm.value.connection == this.connections[i].id) {
        addForm.value.connection = this.connections[i];
      }
    }
    console.log(addForm.value);

    this.deviceService.addDevice(addForm.value).subscribe({
      next: (response: Device) => {
        this.devices = [...this.devices, response];
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
        addForm.reset();
      },
    });
  }

  public addHistoric(): void {
    if (this.his !== undefined) {
      if (this.his?.length == 0) {
        console.log('Entra a id = 1');
        this.id = 1;
      }

      for (let i = 0; i < this.his?.length; i++) {
        console.log(this.his[i].id);
        this.id = this.his[i].id + 1;

        this.historic = {
          encryption: this.his[i]?.encryption,
          id_connection: this.his[i]?.connection?.id,
          id_device: this.id,
          ip: this.his[i]?.ip,
          mac: this.his[i]?.mac,
          name: this.his[i]?.name,
          type_connection: this.his[i]?.type,
          type_device: this.his[i]?.type,
        };
      }
    }


    this.deviceService.addHistoric(this.historic).subscribe({
      next: (response: Historic) => {
        console.log(response);
        this.historics = [...this.historics, response];
      },
    });
  }

  public updateDevice(device: Device): void {
    for (let i = 0; i < this.connections.length; i++) {
      if (device.connection.toString() == this.connections[i].id.toString()) {
        device.connection = this.connections[i];
      }
    }

    this.deviceService.updateDevice(device).subscribe({
      next: (response: Device) => {
        console.log(response);
        this.devices = this.devices
            .map((d) => d.id === device.id ? response : d);
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
    });
  }

  // eslint-disable-next-line require-jsdoc
  public deleteDevice(deviceId: number | undefined): void {
    this.deviceService.deleteDevice(deviceId).subscribe({
      next: (response: void) => {
        console.log(response);
        // this.devices = [];
        this.devices = this.devices.filter((device) => device.id !== deviceId);
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
    });
  }

  // eslint-disable-next-line require-jsdoc
  public openModal(mode: string, device?: Device): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addModal');
    }
    if (mode === 'edit') {
      this.editDevice = device;
      button.setAttribute('data-bs-target', '#editModal');
    }
    if (mode === 'delete') {
      this.delDevice = device;
      button.setAttribute('data-bs-target', '#deleteModal');
    }

    container?.appendChild(button);
    button.click();
  }
}
