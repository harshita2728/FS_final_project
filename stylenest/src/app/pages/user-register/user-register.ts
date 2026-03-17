import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-register.html',
  styleUrls: ['./user-register.css']
})
export class UserRegisterComponent {

  form = {
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private auth: UserAuthService,
    private router: Router
  ) {}

  register() {
    if (this.form.password !== this.form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const payload = {
      fullName: this.form.fullName,
      email: this.form.email,
      phone: this.form.phone,
      password: this.form.password
    };

    this.auth.register(payload).subscribe({
      next: () => {
        alert('Registered successfully! You can now log in.');
        this.router.navigate(['/user/login']);
      },
      error: (err: { error: { message: any; }; }) => {
        alert(err.error?.message || 'Registration failed');
      }
    });
  }
}
