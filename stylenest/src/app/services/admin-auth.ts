import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  private api = 'http://localhost:5000/api/admin/login';

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.api}`, data);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('adminToken');
  }

  logout() {
    localStorage.removeItem('adminToken');
  }
}
