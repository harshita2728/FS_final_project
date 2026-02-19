import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Orders {
  private api = 'http://localhost:5000/api';
  private adminApi = 'http://localhost:5000/api/admin';

  constructor(private http: HttpClient) {}

  private userHeaders(): HttpHeaders {
    const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;
    return new HttpHeaders({
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });
  }

  /** User: get my orders */
  getMyOrders(): Observable<any> {
    return this.http.get(`${this.api}/orders/user`, { headers: this.userHeaders() });
  }

  /** Admin: get all user orders */
  getAdminOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.adminApi}/orders`);
  }

  /** User: place order (items: [{ productId, name?, qty, price }], total) */
  placeOrder(items: any[], total: number): Observable<any> {
    return this.http.post(`${this.api}/orders`, { items, total }, { headers: this.userHeaders() });
  }
}
