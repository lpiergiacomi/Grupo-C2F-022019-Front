import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Provider } from 'src/model/provider';
import { Menu } from './menu';
@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  //private urlEndPoint: string = 'https://app-grupoc2f-022019.herokuapp.com';
  private urlEndPoint: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

    getProvider(id: number): Observable<any> {
      return this.http.get(`${this.urlEndPoint}/providers/${id}`);
    }

    createProvider(provider: Object): Observable<Object> {
      return this.http.post(`${this.urlEndPoint}/providers`, provider);
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