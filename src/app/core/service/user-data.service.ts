import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, count, Observable } from 'rxjs';
import { baseUrl } from '../apiRoot/baseUrl';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  userName: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('userName') || ''
  );


  constructor(private _httpClient: HttpClient) { }

  getCartCount(userId: string): Observable<any> {
    return this._httpClient.get(
      `https://e-commerce-serverside.vercel.app/my-cart/${userId}`
    );
  }
  getAllProducts(): Observable<any> {
    return this._httpClient.get(`${baseUrl}/get`);
  }
}
