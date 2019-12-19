import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Client } from '../model/client';
import { map, catchError } from 'rxjs/operators'
import swal from 'sweetalert2';
import { Provider } from '../model/provider';
import { MenuOrder } from '../model/menuorder';
import { Moment } from 'moment';



@Injectable({
  providedIn: 'root'
})
export class MenuOrderService {
  private urlEndPoint: string = 'http://localhost:8080/menuorder';

  constructor(private http: HttpClient) { }

  getMenuOrdersByIdClient(idClient: number): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/client/${idClient}`);
  }

  getMenuOrdersByIdProvider(idProvider: number): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/provider/${idProvider}`);
  }

  getMenuOrderById(id: number): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/${id}`);
  }

  rateMenuOrder(id: number, menuOrder: MenuOrder): Observable<Object> {
    return this.http.put(`${this.urlEndPoint}/rate/${id}`, menuOrder);
  }

}
