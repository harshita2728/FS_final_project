import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { UserAuthService } from '../../services/user-auth';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl : './user-login.html',
  styleUrls: ['./user-login.css']
})
export class UserLoginComponent {

  email = '';
  password = '';
 
  message = '';
  constructor(private http: HttpClient, private router: Router,
    private auth: UserAuthService
  ) {}

login() {
    this.message = '';

    this.auth.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        localStorage.setItem('userToken', response.token);
        localStorage.setItem('userData', JSON.stringify(response.user));
        this.router.navigate(['/collection']);
      },
      error: (err) => {
        if (err.status === 404) {
          this.message = 'You are not registered. Please register first.';
        } else if (err.status === 401) {
          this.message = 'Incorrect password.';
        } else {
          this.message = 'Login failed. Please try again.';
        }
      }
    });
  }
}
