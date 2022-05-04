/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';


import {TableDevicesComponent} from '../../app/device/pages/table-devices/table-devices.component';
import {ConnectionService} from '../../app/connection/services/connection.service';
import {of} from 'rxjs';
import {FormsModule, NgForm} from '@angular/forms';
import {DeviceService} from '../../app/device/services/device.service';

describe('Test - DeviceComponent', () => {
  let component: TableDevicesComponent;
  let fixture: ComponentFixture<TableDevicesComponent>;
  let connectionService: jasmine.SpyObj<ConnectionService>;
  let deviceService: jasmine.SpyObj<DeviceService>;

  beforeEach(waitForAsync(() => {
    connectionService = jasmine.createSpyObj<ConnectionService>('ConnectionService', ['getConnections', 'addConnection', 'deleteConnection', 'updateConnection']);
    deviceService = jasmine.createSpyObj<DeviceService>('DeviceService', ['getDevices', 'addDevice', 'deleteDevice', 'updateDevice', 'addHistoric']);

    TestBed.configureTestingModule({
      declarations: [TableDevicesComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
      ],
      providers: [
        {provide: ConnectionService, useValue: connectionService},
        {provide: DeviceService, useValue: deviceService},
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDevicesComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });

  it('should have a function getDevices', () => {
    expect(component.getDevices).toBeDefined();

    const devicesTest = [
      {
        id: 1,
        mac: 'B9:24:9E:64:E2:13',
        type: 'Computer',
        connected: true,
        ip: '192.168.1.1',
        trademark: 'Apple',
        connection: {
          id: 1,
          type: 2,
          name: 'Home',
          encryption: '',
          nameco: 'Red1',
          pass: '123456',
        },
      },
      {
        id: 2,
        mac: 'B9:24:9E:64:E2:15',
        type: 'Computer',
        connected: true,
        ip: '192.168.1.2',
        trademark: 'Apple',
        connection: {
          id: 1,
          type: 2,
          name: 'Home',
          encryption: '',
          nameco: 'Red1',
          pass: '123456',
        },
      },
      {
        id: 3,
        mac: 'B9:24:9E:64:E2:17',
        type: 'Computer',
        connected: true,
        ip: '192.168.1.3',
        trademark: 'Apple',
        connection: {
          id: 1,
          type: 2,
          name: 'Home',
          encryption: '',
          nameco: 'Red1',
          pass: '123456',
        },
      },
    ];

    deviceService.getDevices.and.callFake(() => of(devicesTest));
    component.getDevices();

    expect(component.devices.length).toBe(3);
    expect(component.devices).toEqual(devicesTest);
  });

  it('should have a function addDevice', () => {
    expect(component.addDevice).toBeDefined();

    const newDevice = <NgForm>{
      value: {
        id: 1,
        mac: 'B9:24:9E:64:E2:13',
        type: 'Computer',
        connected: true,
        ip: '192.168.1.1',
        trademark: 'Apple',
        connection: {
          id: 1,
          type: 2,
          name: 'Home',
          encryption: '',
          nameco: 'Red1',
          pass: '123456',
        },
      },
    };

    deviceService.addDevice.and.callFake(() => of(newDevice.value));
    component.addDevice(newDevice);

    expect(component.devices[0]).toEqual(newDevice.value);
  });

  it('should have a function deleteDevice', () => {
    expect(component.deleteDevice).toBeDefined();

    const newDevice = <NgForm>{
      value: {
        id: 1,
        mac: 'B9:24:9E:64:E2:13',
        type: 'Computer',
        connected: true,
        ip: '192.168.1.1',
        trademark: 'Apple',
        connection: {
          id: 1,
          type: 2,
          name: 'Home',
          encryption: '',
          nameco: 'Red1',
          pass: '123456',
        },
      },
    };

    deviceService.addDevice.and.callFake(() => of(newDevice.value));
    component.addDevice(newDevice);

    expect(component.devices[0]).toEqual(newDevice.value);

    deviceService.deleteDevice.and.callFake(() => of(newDevice.value));
    component.deleteDevice(1);

    expect(component.devices.length).toBe(0);
    expect(component.devices).toEqual([]);
  });

  it('should have a function updateConnection', () => {
    expect(component.updateDevice).toBeDefined();

    const device = <NgForm>{
      value: {
        id: 1,
        mac: 'B9:24:9E:64:E2:13',
        type: 'Computer',
        connected: true,
        ip: '192.168.1.1',
        trademark: 'Apple',
        connection: {
          id: 1,
          type: 2,
          name: 'Home',
          encryption: '',
          nameco: 'Red1',
          pass: '123456',
        },
      },
    };

    deviceService.addDevice.and.callFake(() => of(device.value));
    component.addDevice(device);

    expect(component.devices[0]).toEqual(device.value);

    const newDevice = <NgForm>{
      value: {
        id: 1,
        mac: 'B9:24:9E:64:E2:13Edit',
        type: 'ComputerEdit',
        connected: false,
        ip: '192.168.1.1',
        trademark: 'AppleEdit',
        connection: {
          id: 1,
          type: 2,
          name: 'Home',
          encryption: '',
          nameco: 'Red1',
          pass: '123456',
        },
      },
    };

    deviceService.updateDevice.and.callFake(() => of(newDevice.value));
    component.updateDevice(newDevice.value);

    expect(component.devices[0]).toEqual(newDevice.value);
  });

  it('should have a function addHistoric', () => {
    const historic = {
      encryption: '',
      id_connection: 1,
      id_device: 1,
      ip: '192.168.1.1',
      mac: 'B8:D3:2A:86:7F:C1',
      name: 'Home',
      type_connection: '2',
      type_device: 'Computador',
    };

    deviceService.addHistoric.and.callFake(() => of(historic));
    component.addHistoric();

    expect(component.historics).toEqual([historic]);
  });
});
