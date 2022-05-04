/* eslint-disable require-jsdoc */
import {Component, OnInit} from '@angular/core';
import {ConnectionService} from '../../services/connection.service';
import {Connection} from '../../interfaces/connection';
import {HttpErrorResponse} from '@angular/common/http';
import {faPen, faTrash} from '@fortawesome/free-solid-svg-icons';
import {NgForm} from '@angular/forms';
import Swal from 'sweetalert2';

// eslint-disable-next-line new-cap
@Component({
  selector: 'app-table-connections',
  templateUrl: './table-connections.component.html',
})
export class TableConnectionsComponent implements OnInit {
  faTrash = faTrash;
  faPen = faPen;

  public connections: Connection[] = [];
  public editConnection: Connection | undefined;
  public delConnection: Connection | undefined;

  constructor(private connectionService: ConnectionService) { }

  ngOnInit(): void {
    this.getConnections();
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

  public addConnection(addForm: NgForm): void {
    document.getElementById('btnAgregarC')?.click();
    typeof(addForm.value.type) === 'string' ?
      parseInt(addForm.value.type) : addForm.value.type;
    this.connectionService.addConnection(addForm.value).subscribe({
      next: (response: Connection) => {
        console.log(response);
        this.connections = [...this.connections, response];
        // this.getConnections();
        // addForm.reset();
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

  public updateConnection(connection: Connection): void {
    this.connectionService.updateConnection(connection).subscribe({
      next: (response: Connection) => {
        console.log(response);
        this.connections = this.connections
            .map((c) => c.id === response.id ? response : c);
        // this.getConnections();
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

  public deleteConnection(connectionId: number | undefined): void {
    this.connectionService.deleteConnection(connectionId).subscribe({
      next: (response: void) => {
        console.log(response);
        // this.connections = [];
        this.connections = this.connections
            .filter((connection) => connection.id !== connectionId);
        // this.getConnections();
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

  public openModal(mode: string, connection?: Connection): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addModal');
    }
    if (mode === 'edit') {
      this.editConnection = connection;
      button.setAttribute('data-bs-target', '#editModal');
    }
    if (mode === 'delete') {
      this.delConnection = connection;
      button.setAttribute('data-bs-target', '#deleteModal');
    }

    container?.appendChild(button);
    button.click();
  }
}
