import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl : './user-login.html',
  styleUrls: ['./user-login.css']
})
export class UserLoginComponent {

  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post<any>('http://localhost:5000/api/user/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        localStorage.setItem('user', 'true');
        this.router.navigate(['./collection']);
      },
      error: () => alert('Invalid login')
    });
  }
}
