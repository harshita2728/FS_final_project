import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AdminAuthService } from '../../services/admin-auth';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-navbar.html'
})
export class AdminNavbar {

  constructor(
    private auth: AdminAuthService,
    private router: Router
  ) {}

  logout() {
    this.auth.logout();
    // this.router.navigate(['/pages/home']);
    location.href='';
  }
}