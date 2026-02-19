import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-register.html'
})
export class UserRegisterComponent {

  form = {
    email: '',
    password: ''
  };

  constructor(
    private auth: UserAuthService,
    private router: Router
  ) {}

  register() {
    this.auth.register(this.form).subscribe({
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
