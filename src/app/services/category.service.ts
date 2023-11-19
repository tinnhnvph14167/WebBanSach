import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private API = 'http://localhost:4000/api/category';
  token = localStorage.getItem('token')
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    }),
  }
  constructor(
    private http: HttpClient
  ) { }

  categoryAdd(category: any): Observable<any> {
    console.log("category1",category)
    const url = `${this.API}/createCategory`;
    return this.http.post<any>(url, category, this.httpOptions)
  }

  categoryUpdate(category: any): Observable<any> {
    const url = `${this.API}/updateCategory/${category._id}`;
    return this.http.put<any>(url, category, this.httpOptions);
  }
  getCategory(_id: string | null): Observable<any> {
    const url = `${this.API}/getCategoryID/${_id}`
    return this.http.get<any>(url, this.httpOptions)
  }

  getAllCategory(): Observable<any[]> {
    const url = `${this.API}/getCategory`
    return this.http.get<any[]>(url, this.httpOptions)
  }

  deleteCategory(_id: string | null): Observable<any> {
    const url = `${this.API}/deleteCategory/${_id}`
    return this.http.delete<any>(url, this.httpOptions)
  }

  getproductByCategory(_id: string): Observable<any> {
    const url = `${this.API}/category/${_id}`;
    return this.http.get<any>(url, this.httpOptions);
  }
}
