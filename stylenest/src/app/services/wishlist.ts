import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Wishlist {
  private api = 'http://localhost:5000/api/wishlist';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });
  }

  getWishlist(): Observable<any> {
    return this.http.get(this.api, { headers: this.getHeaders() });
  }

  addToWishlist(productId: string): Observable<any> {
    return this.http.post(this.api + '/add', { productId }, { headers: this.getHeaders() });
  }

  removeFromWishlist(productId: string): Observable<any> {
    return this.http.delete(`${this.api}/remove/${productId}`, { headers: this.getHeaders() });
  }
}
