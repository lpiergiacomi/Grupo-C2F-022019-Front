import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Menu } from './menu';
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  //private urlEndPoint: string = 'https://app-grupoc2f-022019.herokuapp.com';
  private urlEndPoint: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

    getMenu(id: number): Observable<any> {
      return this.http.get(`${this.urlEndPoint}/menus/${id}`);
    }

    createMenu(menu: Object): Observable<Object> {
      return this.http.post(`${this.urlEndPoint}/menus`, menu);
    }

    updateMenu(id: number, value: any): Observable<Object> {
      return this.http.put(`${this.urlEndPoint}/menus/${id}`, value);
    }
  
    deleteMenu(id: number): Observable<any> {
      return this.http.delete(`${this.urlEndPoint}/menus/${id}`, { responseType: 'text' });
    }
  
    getMenusList(): Observable<Menu[]> {
      return this.http.get(`${this.urlEndPoint}/menus`).pipe(map(response => response as Menu[])
      );
    }
}