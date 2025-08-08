import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../apiRoot/baseUrl';
import { Ilogin, Iregister } from '../intergaces/iregister';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }



  register(data: Iregister): Observable<any> {
    return this._http.post(`${baseUrl}/api/users`, data)
  }
  login(data: Ilogin): Observable<any> {
    return this._http.post(`${baseUrl}/api/users/auth`, data);
  }
  authrized(): boolean {
    if (localStorage.getItem('token') != null) {
      return true;
    } else {
      return false;
    }
  }
}
