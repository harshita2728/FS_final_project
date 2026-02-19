import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Cart {
  private api = 'http://localhost:5000/api/cart';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });
  }

  addToCart(productId: string, qty: number = 1): Observable<any> {
    return this.http.post(this.api + '/add', { productId, qty }, { headers: this.getHeaders() });
  }

  getCart(): Observable<any> {
    return this.http.get(this.api, { headers: this.getHeaders() });
  }

  removeFromCart(productId: string): Observable<any> {
    return this.http.delete(`${this.api}/remove/${productId}`, { headers: this.getHeaders() });
  }
}
