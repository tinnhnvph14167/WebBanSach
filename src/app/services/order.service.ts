import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  get ():Observable<any> {
    return this.http.get<any>("http://localhost:4000/api/order")
  }
  getOne (id:string):Observable<any> {
    return this.http.get<any>(`http://localhost:4000/api/order/${id}`)
  }
  create (data:any):Observable<any> {
    return this.http.post<any>("http://localhost:4000/api/order",data)
  }
  detail (id:string):Observable<any> {
    return this.http.get<any>(`http://localhost:4000/api/order/${id}`)
  }
  cancelOrder (id:string):Observable<any> {
    return this.http.put<any>(`http://localhost:4000/api/cancel-order/${id}`,{})
  }
  changeOrder (id:string):Observable<any> {
    return this.http.put<any>(`http://localhost:4000/api/change-order/${id}`,{})
  }

}
