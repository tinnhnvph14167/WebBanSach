import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http:HttpClient) { }

  get ():Observable<any> {
    return this.http.get<any>("http://localhost:4000/api/cart")
  }
  getOne (id:string):Observable<any> {
    return this.http.get<any>(`http://localhost:4000/api/my-cart/${id}`)
  }
  create (data:any):Observable<any> {
    return this.http.post<any>("http://localhost:4000/api/cart",data)
  }
  delete (id:string):Observable<any> {
    return this.http.delete<any>(`http://localhost:4000/api/cart/${id}`)
  }

}
