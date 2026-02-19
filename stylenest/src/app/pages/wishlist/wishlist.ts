import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Wishlist as WishlistService } from '../../services/wishlist';
import { Cart } from '../../services/cart';
import { UserAuthService } from '../../services/user-auth';

@Component({
  standalone: true,
  selector: 'app-wishlist',
  imports: [CommonModule, RouterModule],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export class WishlistPageComponent implements OnInit {
  wishlist: any = null;
  loading = true;
  removingId: string | null = null;

  constructor(
    private wishlistService: WishlistService,
    private cartService: Cart,
    public auth: UserAuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/user/login']);
      return;
    }
    this.loadWishlist();
  }

  loadWishlist() {
    this.wishlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishlist = res;
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
    this.wishlistService.removeFromWishlist(productId).subscribe({
      next: () => {
        this.removingId = null;
        this.loadWishlist();
      },
      error: () => { this.removingId = null; this.cdr.detectChanges(); }
    });
  }

  addToCart(productId: string) {
    this.cartService.addToCart(productId, 1).subscribe({
      next: () => alert('Added to cart!'),
      error: (e) => alert(e.error?.message || 'Failed to add to cart')
    });
  }
}
