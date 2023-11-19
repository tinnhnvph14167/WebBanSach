import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API = 'http://localhost:4000/api/auth'
  constructor(private http: HttpClient) { }

  signup(data: any): Observable<any> {
    return this.http.post<any>(`${this.API}/register`, data)
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.API}/login-web`, data)
    
  }
}
