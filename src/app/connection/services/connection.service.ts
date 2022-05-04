/* eslint-disable require-jsdoc */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Connection} from '../interfaces/connection';
import {environment} from '../../../environments/environment';

// eslint-disable-next-line new-cap
@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  private apiServer = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getConnections(): Observable<Connection[]> {
    return this.http.get<Connection[]>(`${this.apiServer}/connections`);
  }

  public addConnection(connection: Connection): Observable<Connection> {
    // eslint-disable-next-line max-len
    return this.http.post<Connection>(`${this.apiServer}/connections`, connection);
  }

  public updateConnection(connection: Connection): Observable<Connection> {
    // eslint-disable-next-line max-len
    return this.http.put<Connection>(`${this.apiServer}/connections/${connection.id}`, connection);
  }

  public deleteConnection(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiServer}/connections/${id}`);
  }
}
