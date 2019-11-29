import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { Provider } from 'src/app/model/provider';
import { Menu } from './../model/menu';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  //private urlEndPoint: string = 'https://app-grupoc2f-022019.herokuapp.com';
  private urlEndPoint: string = 'http://localhost:8080/providers';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

    getProvider(id: number): Observable<any> {
      return this.http.get(`${this.urlEndPoint}/${id}`);
    }

    createProvider(provider: Provider): Observable<Provider> {
      return this.http.post<Provider>(this.urlEndPoint, provider, { headers: this.httpHeaders }).pipe(
        map((response: any) => 
        
        response.provider as Provider),
        catchError(e => {
          if (e.status == 400) {
            return throwError(e);
          }
          swal.fire(e.error.mensaje, e.error.error, "error");
          return throwError(e);
        })

      )
    }

    updateProvider(id: number, value: any): Observable<Object> {
      return this.http.put(`${this.urlEndPoint}/providers/${id}`, value);
    }
  
    deleteProvider(id: number): Observable<any> {
      return this.http.delete(`${this.urlEndPoint}/providers/${id}`, { responseType: 'text' });
    }
  
    getProvidersList(): Observable<Provider[]> {
      return this.http.get(`${this.urlEndPoint}/providers`).pipe(map(response => response as Provider[])
      );
    }

    updateCredit(id: number, value: any): Observable<Object> {
      return this.http.put(`${this.urlEndPoint}/providers/${id}/credit`, value);
    }

    getProvidersMenus(id: number): Observable<Menu[]> {
      return this.http.get(`${this.urlEndPoint}/providers/${id}/menus`).pipe(map(response => response as Array<Menu>));
    }
}