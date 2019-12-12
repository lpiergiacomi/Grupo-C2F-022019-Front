import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Client } from '../model/client';
import { map, catchError } from 'rxjs/operators'
import swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class ClientService {
  //private urlEndPoint: string = 'https://app-grupoc2f-022019.herokuapp.com/menus';
  private urlEndPoint: string = 'http://localhost:8080/clients';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }



  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.urlEndPoint, client, { headers: this.httpHeaders }).pipe(
      map((response: any) => 
      
      response.client as Client),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })

    )
  }

  getClientByMail(mail: string): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/find/${mail}`);
  }


}
