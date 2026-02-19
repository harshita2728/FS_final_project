import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Orders as OrdersService } from '../../services/orders';
import { UserAuthService } from '../../services/user-auth';

@Component({
  standalone: true,
  selector: 'app-orders',
  imports: [CommonModule, RouterModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class UserOrdersPageComponent implements OnInit {
  orders: any[] = [];
  loading = true;

  constructor(
    private ordersService: OrdersService,
    public auth: UserAuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/user/login']);
      return;
    }
    this.loadOrders();
  }

  loadOrders() {
    this.ordersService.getMyOrders().subscribe({
      next: (res) => {
        this.orders = Array.isArray(res) ? res : [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  orderDate(order: any): string {
    return order.createdAt ? new Date(order.createdAt).toLocaleString() : '–';
  }
}
