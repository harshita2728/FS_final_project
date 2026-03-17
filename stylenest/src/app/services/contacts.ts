import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private api = 'http://localhost:5000/api';
  private adminApi = 'http://localhost:5000/api/admin';

  constructor(private http: HttpClient) {}

  /** User: send a contact message */
  sendContact(data: any): Observable<any> {
    return this.http.post(`${this.api}/contact`, data);
  }

  /** Admin: get all contact messages */
  getAllContacts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.adminApi}/contacts`);
  }
}
