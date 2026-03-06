import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Cart as CartService } from '../../services/cart';
import { Orders } from '../../services/orders';
import { UserAuthService } from '../../services/user-auth';

@Component({
  standalone: true,
  selector: 'app-cart',
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartPageComponent implements OnInit {
  cart: any = null;
  loading = true;
  removingId: string | null = null;
  placing = false;
  updatingId: string | null = null;

  constructor(
    private cartService: CartService,
    private ordersService: Orders,
    public auth: UserAuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/user/login']);
      return;
    }
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe({
      next: (res) => {
        this.cart = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  remove(productId: string) {
    this.removingId = productId;
    this.cartService.removeFromCart(productId).subscribe({
      next: () => {
        this.removingId = null;
        this.loadCart();
      },
      error: () => { this.removingId = null; this.cdr.detectChanges(); }
    });
  }

  increaseQty(item: any) {
    const productId = item.productId?._id;
    if (!productId) return;
    
    this.updatingId = productId;
    const newQty = (item.qty ?? 1) + 1;
    this.cartService.updateQuantity(productId, newQty).subscribe({
      next: (res) => {
        this.cart = res;
        this.updatingId = null;
        this.cdr.detectChanges();
      },
      error: () => { this.updatingId = null; this.cdr.detectChanges(); }
    });
  }

  decreaseQty(item: any) {
    const productId = item.productId?._id;
    if (!productId) return;
    
    if (item.qty <= 1) {
      this.remove(productId);
      return;
    }
    
    this.updatingId = productId;
    const newQty = (item.qty ?? 1) - 1;
    this.cartService.updateQuantity(productId, newQty).subscribe({
      next: (res) => {
        this.cart = res;
        this.updatingId = null;
        this.cdr.detectChanges();
      },
      error: () => { this.updatingId = null; this.cdr.detectChanges(); }
    });
  }

  get total(): number {
    if (!this.cart?.items?.length) return 0;
    return this.cart.items.reduce((sum: number, i: any) => {
      const p = i.productId;
      const price = p?.price ?? 0;
      const qty = i.qty ?? 1;
      return sum + price * qty;
    }, 0);
  }

  placeOrder() {
    if (!this.cart?.items?.length) return;
    this.placing = true;
    const items = this.cart.items.map((i: any) => ({
      productId: i.productId?._id,
      name: i.productId?.name,
      qty: i.qty ?? 1,
      price: i.productId?.price ?? 0
    }));
    const total = this.total;
    this.ordersService.placeOrder(items, total).subscribe({
      next: () => {
        this.placing = false;
        alert('Order placed successfully!');
        this.router.navigate(['/user/orders']);
        this.loadCart();
      },
      error: () => {
        this.placing = false;
        this.cdr.detectChanges();
      }
    });
  }
}
