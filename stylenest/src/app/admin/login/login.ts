import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminAuthService } from '../../services/admin-auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule , ReactiveFormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {

  // ✅ form object CREATED
  form = {
    email: '',
    password: ''
  };

  constructor(
    private auth: AdminAuthService,   // ✅ auth CREATED
    private router: Router
  ) {}

  login() {
    this.auth.login(this.form).subscribe({
      next: (res: any) => {
        localStorage.setItem('adminToken', res.token);
        this.router.navigate(['./admin/dashboard']);
      },
      error: (err: any) => {
        alert('Invalid admin credentials');
        console.error(err);
      }
    });
  }
}
