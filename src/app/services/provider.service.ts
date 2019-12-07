import { Injectable } from '@angular/core';
import { Provider } from 'src/app/model/provider';
import { Menu } from './../model/menu';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap, mergeMap } from 'rxjs/operators'
import swal from 'sweetalert2';
import { formatDate } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  //private urlEndPoint: string = 'https://app-grupoc2f-022019.herokuapp.com/providers';
  private urlEndPoint: string = 'http://localhost:8080/providers';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })


  constructor(private http: HttpClient) { }

    getProvider(id: number): Observable<any> {
      return this.http.get(`${this.urlEndPoint}/${id}`);
    }

    createProvider(provider: Provider, logo: File): Observable<Provider> {
     return this.http.post<Provider>(this.urlEndPoint, provider, { headers: this.httpHeaders }).pipe(
       
          mergeMap(response => {
            let prov = response as Provider;
            return this.subirLogo(logo, prov.id);
        }),
        catchError(e => {
          if (e.status == 400) {
            return throwError(e);
          }
          swal.fire(e.error.mensaje, e.error.error, "error");
          return throwError(e);
        })
      );
    }

    updateProvider(id: number, value: any): Observable<Object> {
      return this.http.put(`${this.urlEndPoint}/${id}`, value);
    }
  
    deleteProvider(id: number): Observable<any> {
      return this.http.delete(`${this.urlEndPoint}/${id}`, { responseType: 'text' });
    }
  
    getProvidersList(): Observable<Provider[]> {
      return this.http.get(`${this.urlEndPoint}`).pipe(
        map(response => response as Provider[]),
        catchError(e => {
          if (e.status == 400) {
            return throwError(e);
          }
          swal.fire("Error", "Ocurrió un error al mostrar los proveedores. Por favor, te pedimos que intentes nuevamente más tarde.", "error");
          return throwError(e);
        })
      );
    }

    updateCredit(id: number, value: any): Observable<Object> {
      return this.http.put(`${this.urlEndPoint}/${id}/credit`, value);
    }

    getProvidersMenus(id: number): Observable<Menu[]> {
      return this.http.get(`${this.urlEndPoint}/${id}/menus`).pipe(map(response => response as Array<Menu>));
    }

    subirLogo(logo: File, id): Observable<Provider>{
      let formData = new FormData();
      formData.append("logo", logo),
      formData.append("id", id);


      const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
        reportProgress: true
      });
  
      return this.http.request(req).pipe(
        map((response: any) => response as Provider),
        catchError(e => {
          if (e.status == 400) {
            return throwError(e);
          }
          swal.fire(e.error.mensaje, e.error.error, "error");
          return throwError(e);
        })
      )
    }
}