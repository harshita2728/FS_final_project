import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar';


@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent
  ],
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `
})
export class PublicLayout {}
