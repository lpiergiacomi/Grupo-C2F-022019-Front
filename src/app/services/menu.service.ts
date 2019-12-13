import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators'
import { Menu } from './../model/menu';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { ProviderService } from './provider.service';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  //private urlEndPoint: string = 'https://app-grupoc2f-022019.herokuapp.com/menus';
  private urlEndPoint: string = 'http://localhost:8080/menus';
  
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, private http: HttpClient, private providerService: ProviderService) { }

    getMenu(id: number): Observable<any> {
      return this.http.get(`${this.urlEndPoint}/${id}`);
    }

    updateMenu(id: number, value: any): Observable<Object> {
      return this.http.put(`${this.urlEndPoint}/${id}`, value);
    }
  
    deleteMenu(id: number): Observable<any> {
      return this.http.delete(`${this.urlEndPoint}/${id}`, { responseType: 'text' });
    }

    getMenusList(page: number): Observable<any> {
      return this.http.get(`${this.urlEndPoint}/page/${page}`).pipe(
        map((response: any) => {
          (response.content as Menu[]).map(menu => {
            let datePipe = new DatePipe('es')
            menu.validityDateBegin = datePipe.transform(menu.validityDateBegin, 'dd/MM/yyyy');
            menu.validityDateEnd = datePipe.transform(menu.validityDateEnd, 'dd/MM/yyyy');
            this.providerService.getProvider(this.storage.get('providerId')).subscribe(provider => menu.provider = provider);
            return menu;
          });
          return response;
        })
      );
    }

    createMenu(menu: Menu): Observable<Menu> {
      return this.http.post<Menu>(this.urlEndPoint, menu, { headers: this.httpHeaders }).pipe(
        map((response: any) => 
        
        response.menu as Menu),
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