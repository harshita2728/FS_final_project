import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) {}

  // GET all products
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }
  getProductById(id: string) :Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }
  // ADD product (admin)
  addProduct(product: any): Observable<any> {
    return this.http.post(this.api, product);
  }

  // DELETE product
  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  // UPDATE product
  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put(`${this.api}/${id}`, product);
  }
}
