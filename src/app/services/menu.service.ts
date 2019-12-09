import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { Menu } from './../model/menu';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  //private urlEndPoint: string = 'https://app-grupoc2f-022019.herokuapp.com/menus';
  private urlEndPoint: string = 'http://localhost:8080/menus';
  
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

    getMenu(id: number): Observable<any> {
      return this.http.get(`${this.urlEndPoint}/${id}`);
    }

    updateMenu(id: number, value: any): Observable<Object> {
      return this.http.put(`${this.urlEndPoint}/${id}`, value);
    }
  
    deleteMenu(id: number): Observable<any> {
      return this.http.delete(`${this.urlEndPoint}/${id}`, { responseType: 'text' });
    }
  
    getMenusList(): Observable<Menu[]> {
      return this.http.get(`${this.urlEndPoint}`).pipe(
        map(response => {
          let menus = response as Array<Menu>;
          return menus.map(menu => {
            let datePipe = new DatePipe('es')
            menu.validityDateBegin = datePipe.transform(menu.validityDateBegin, 'dd/MM/yyyy');
            menu.validityDateEnd = datePipe.transform(menu.validityDateEnd, 'dd/MM/yyyy');
            return menu;
          });
        }
        )
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