import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  //private urlEndPoint: string = 'https://app-grupoc2f-022019.herokuapp.com/menus';
  private urlEndPoint: string = 'http://localhost:8080/clients';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }



    createClientForLogin(client: any): Observable<any> {
      return this.http.post(`${this.urlEndPoint}`, client);
    }

    getClientByMail(mail: string): Observable<any> {
      return this.http.get(`${this.urlEndPoint}/find/${mail}`);
    }

}
