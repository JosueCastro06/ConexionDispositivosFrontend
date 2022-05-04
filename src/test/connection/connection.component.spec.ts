/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';


import {TableConnectionsComponent} from '../../app/connection/pages/table-connections/table-connections.component';
import {ConnectionService} from '../../app/connection/services/connection.service';
import {of} from 'rxjs';
import {FormsModule, NgForm} from '@angular/forms';

describe('Test - ConnectionComponent', () => {
  let component: TableConnectionsComponent;
  let fixture: ComponentFixture<TableConnectionsComponent>;
  let connectionService: jasmine.SpyObj<ConnectionService>;

  beforeEach(waitForAsync(() => {
    connectionService = jasmine.createSpyObj<ConnectionService>('ConnectionService', ['getConnections', 'addConnection', 'deleteConnection', 'updateConnection']);

    TestBed.configureTestingModule({
      declarations: [TableConnectionsComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
      ],
      providers: [
        {provide: ConnectionService, useValue: connectionService},
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableConnectionsComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });

  it('should have a function getConnections', () => {
    expect(component.getConnections).toBeDefined();

    const connectionsTest = [
      {id: 1, type: 2, name: 'Home', encryption: '', nameco: 'Red1', pass: '123456'},
      {id: 2, type: 2, name: 'Home2', encryption: '', nameco: 'Red2', pass: '123456'},
      {id: 3, type: 2, name: 'Home3', encryption: '', nameco: 'Red3', pass: '123456'},
    ];

    connectionService.getConnections.and.returnValue(of(connectionsTest));
    component.getConnections();

    expect(component.connections).toEqual(connectionsTest);
  });

  it('should have a function addConnection', () => {
    const newConnection = <NgForm>{
      value: {
        id: 1,
        type: 2,
        name: 'Home',
        encryption: '',
        nameco: 'Red1',
        pass: '123456',
      },
    };

    connectionService.addConnection.and.returnValue(of(newConnection.value));
    component.addConnection(newConnection);

    expect(component.connections[0]).toEqual(newConnection.value);
  });

  it('should have a function deleteConnection', () => {
    expect(component.deleteConnection).toBeDefined();

    const connection = <NgForm>{
      value: {
        id: 1,
        type: 2,
        name: 'Home',
        encryption: '',
        nameco: 'Red1',
        pass: '123456',
      },
    };

    connectionService.addConnection.and.callFake(() => of(connection.value));
    component.addConnection(connection);

    expect(component.connections[0]).toEqual(connection.value);

    connectionService.deleteConnection.and.callFake(() => of(connection.value));
    component.deleteConnection(1);

    expect(component.connections).toEqual([]);
  });

  it('should have a function updateConnection', () => {
    const connection = <NgForm>{
      value: {
        id: 1,
        type: 2,
        name: 'Home',
        encryption: '',
        nameco: 'Red1',
        pass: '123456',
      },
    };

    connectionService.addConnection.and.callFake(() => of(connection.value));
    component.addConnection(connection);

    expect(component.connections[0]).toEqual(connection.value);

    const newConnection = {
      id: 1,
      type: 2,
      name: 'HomeEdit',
      encryption: '',
      nameco: 'RedEdit',
      pass: '123456',
    };

    connectionService.updateConnection.and.callFake(() => of(newConnection));
    component.updateConnection(newConnection);

    expect(component.connections[0]).toEqual(newConnection);
  });
});
