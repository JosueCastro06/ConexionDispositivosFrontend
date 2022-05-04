/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';


import {HistoricDCComponent} from '../../app/historic/pages/historic-d-c/historic-d-c.component';
import {of} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {HistoricService} from '../../app/historic/services/historic.service';

describe('Test - HistoricComponent', () => {
  let component: HistoricDCComponent;
  let fixture: ComponentFixture<HistoricDCComponent>;
  let historicService: jasmine.SpyObj<HistoricService>;

  beforeEach(waitForAsync(() => {
    historicService = jasmine.createSpyObj<HistoricService>('HistoricService', ['getHistoric']);

    TestBed.configureTestingModule({
      declarations: [HistoricDCComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
      ],
      providers: [
        {provide: HistoricService, useValue: historicService},
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricDCComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });

  it('should have a function getHistoric', () => {
    expect(component.getHistoric).toBeDefined();

    const historicTest = [
      {encryption: '', id_connection: 1, id_device: 1, ip: '192.168.1.1', mac: 'B9:24:9E:64:E2:13', name: 'Home', type_connection: '2', type_device: 'Computador'},
      {encryption: '', id_connection: 2, id_device: 1, ip: '192.168.1.2', mac: 'B9:24:9E:64:E2:14', name: 'Home2', type_connection: '2', type_device: 'Computador'},
      {encryption: '', id_connection: 3, id_device: 1, ip: '192.168.1.3', mac: 'B9:24:9E:64:E2:15', name: 'Home3', type_connection: '2', type_device: 'Computador'},
    ];

    historicService.getHistoric.and.returnValue(of(historicTest));
    component.getHistoric();

    expect(component.historics.length).toBe(3);
    expect(component.historics).toEqual(historicTest);
  });
});
