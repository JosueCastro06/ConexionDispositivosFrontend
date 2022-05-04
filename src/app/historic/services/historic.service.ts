/* eslint-disable require-jsdoc */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Historic} from '../../device/interfaces/historic';
import {Observable} from 'rxjs';

// eslint-disable-next-line new-cap
@Injectable({
  providedIn: 'root',
})
export class HistoricService {
  private apiServer = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getHistoric(): Observable<Historic[]> {
    return this.http.get<Historic[]>(`${this.apiServer}/historic`);
  }
}
