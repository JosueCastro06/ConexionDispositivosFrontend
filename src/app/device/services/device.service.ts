/* eslint-disable require-jsdoc */
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Device} from '../interfaces/device';
import {Historic} from '../interfaces/historic';

// eslint-disable-next-line new-cap
@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private apiServer = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.apiServer}/devices`);
  }

  public addDevice(device: Device): Observable<Device> {
    return this.http.post<Device>(`${this.apiServer}/devices`, device);
  }

  public updateDevice(device: Device): Observable<Device> {
    // eslint-disable-next-line max-len
    return this.http.put<Device>(`${this.apiServer}/devices/${device.id}`, device);
  }

  public deleteDevice(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiServer}/devices/${id}`);
  }

  // eslint-disable-next-line require-jsdoc
  public addHistoric(historic: Historic): Observable<Historic> {
    return this.http.post<Historic>(`${this.apiServer}/historic`, historic);
  }
}
