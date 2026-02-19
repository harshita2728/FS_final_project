import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Orders } from '../../services/orders';

@Component({
  standalone: true,
  selector: 'app-manage-orders',
  imports: [CommonModule],
  templateUrl: './manage-orders.html'
})
export class ManageOrdersComponent implements OnInit {

  loading = true;
  orders: any[] = [];

  constructor(
    private ordersService: Orders,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.ordersService.getAdminOrders().subscribe({
      next: (res) => {
        this.orders = res || [];
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
