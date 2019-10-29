import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Provider } from './provider'
@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private urlEndPoint: string = 'https://app-grupoc2f-022019.herokuapp.com/';

  constructor(private http: HttpClient) { }
    
    getProviders(): Observable<Provider[]> {
      return this.http.get(this.urlEndPoint).pipe(
        map(response => response as Provider[])
      );
    }
}