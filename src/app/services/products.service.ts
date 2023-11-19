import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducts } from '../interface/products';





@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private API = 'http://localhost:4000/api';


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

  getAllProducts(): Observable<any[]> {
    const url = `${this.API}/Products/getProducts`;
    return this.http.get<any[]>(url, this.httpOptions)
  }

  getProduct(_id: string | null): Observable<any> {
    const url = `${this.API}/Products/getProductsID/${_id}`;
    return this.http.get<any>(url, this.httpOptions)
  }

  addProduct(Products: IProducts): Observable<any> {
    const url = `${this.API}/Products/createProducts`;
    return this.http.post<any>(url, Products, this.httpOptions)
  }

  getCategory(): Observable<any> {
    const url = `${this.API}/category/getCategory`;
    return this.http.get<any>(url, this.httpOptions)
  }

  updateProduct(product: any): Observable<any> {
  
    const url = `${this.API}/Products/updateProducts/${product._id}`;
    console.log("Products",product._id)
    return this.http.put<any>(url, product, this.httpOptions);
  }

  deleteProduct(id: string | null): Observable<any> {
    const url = `${this.API}/Products/deleteProducts/${id}`;
    return this.http.delete<any>(url, this.httpOptions)
  }


  getProductsByCategory(categoryId: string): Observable<any[]> {
    const url = `${this.API}/Products?category=${categoryId}`;
    return this.http.get<any[]>(url, this.httpOptions);
  }

  searchProducts(searchValue: string): Observable<any> {
    return this.http.get<any>(`${this.API}/Products/search?pr=${searchValue}`);
  }

  uploadImage(vals: any): Observable<any> {
    {
      let data = vals;
      return this.http.post(`https://api.cloudinary.com/v1_1/doa7mkkpq/image/upload`, data)
    }
  }

}
