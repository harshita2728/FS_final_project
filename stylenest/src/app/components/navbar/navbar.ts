import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserAuthService } from '../../services/user-auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {

  isOpen = false;

  constructor(
    public auth: UserAuthService,
    private router: Router
  ) {}

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this.auth.logout();
    this.isOpen = false;
    this.router.navigate(['/']);
  }
}
