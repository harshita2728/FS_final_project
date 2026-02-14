import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminNavbar } from '../admin-navbar/admin-navbar';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: "./admin-dashboard.html",
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {

}
