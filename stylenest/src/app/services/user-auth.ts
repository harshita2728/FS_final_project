import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private api = 'http://localhost:5000/api/user';

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.api}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.api}/login`, data);
  }

  isLoggedIn(): boolean {
    if (typeof window === 'undefined') return false; // SSR: no localStorage on server
    return !!localStorage.getItem('userToken');
  }

  logout() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
  }

  getUser() {
    if (typeof window === 'undefined') return {};
    return JSON.parse(localStorage.getItem('userData') || '{}');
  }
}
