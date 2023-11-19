import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {


  private API = 'http://localhost:4000/api';

  constructor(private http: HttpClient) { }

  geAlltUser(): Observable<any[]> {
    const url = `${this.API}/user`
    return this.http.get<any[]>(url)
  }

  getByIduser(_id: string | null): Observable<any> {
    const url = `${this.API}/user/${_id}`
    return this.http.get<any>(url)
  }

  removeUser(_id: string | null): Observable<any> {
    const url = `${this.API}/user/${_id}`
    return this.http.delete<any>(url)
  }

  updateUser(user: any): Observable<any> {
    const url = `${this.API}/user/${user._id}`
    return this.http.put<any>(url, user)
  }
}
