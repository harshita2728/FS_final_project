import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminNavbar } from '../../admin/admin-navbar/admin-navbar';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    AdminNavbar
  ],
  template: `
    <app-admin-navbar></app-admin-navbar>
    <router-outlet></router-outlet>
  `
})
export class AdminLayout {}
