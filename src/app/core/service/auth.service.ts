import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../apiRoot/baseUrl';
import { Ilogin, Iregister } from '../intergaces/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }



  register(data: Iregister): Observable<any> {
    return this._http.post(`https://fakestoreapi.com/users`, data)
  }
  login(data: Ilogin): Observable<any> {
    return this._http.post(`https://fakestoreapi.com/auth/login`, data);
  }
  getUserById(id: number){
    return this._http.get(`https://fakestoreapi.com/users/1`)
  }

  authrized(): boolean {
    if (localStorage.getItem('token') != null) {
      return true;
    } else {
      return false;
    }
  }

  logOutUser(): Observable<any> {
    return this._http.post(`${baseUrl}/api/users/logout`, {});
  }


}
