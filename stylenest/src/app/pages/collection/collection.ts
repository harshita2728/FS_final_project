import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product';
import { Cart } from '../../services/cart';
import { Wishlist } from '../../services/wishlist';
import { UserAuthService } from '../../services/user-auth';
import { filter } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-collection',
  imports: [CommonModule, RouterModule],
  templateUrl: './collection.html',
  styleUrls: ['./collection.css']
})
export class CollectionComponent implements OnInit {

  products: any[] = [];
  allProducts: any[] = [];
  activeCategory: string | null = null;
  addingId: string | null = null;
  addingWishlistId: string | null = null;

  constructor(
    private productService: ProductService,
    private cart: Cart,
    private wishlist: Wishlist,
    public auth: UserAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProducts();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.loadProducts());

    this.route.queryParamMap.subscribe(params => {
      const category = params.get('category');
      this.activeCategory = category ? category.toLowerCase() : null;
      this.applyCategoryFilter();
    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.allProducts = res;
        this.applyCategoryFilter();
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error loading products', err)
    });
  }

  applyCategoryFilter() {
    if (!this.activeCategory || this.activeCategory === 'all') {
      this.products = this.allProducts;
      return;
    }

    this.products = this.allProducts.filter(p => {
      const value = (p.category || '').toString().toLowerCase();
      return value === this.activeCategory || value === 'all';
    });
  }

  addToCart(product: any) {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/user/login']);
      return;
    }
    this.addingId = product._id;
    this.cart.addToCart(product._id, 1).subscribe({
      next: () => {
        this.addingId = null;
        this.cdr.markForCheck();
        alert('Added to cart!');
      },
      error: (err) => {
        this.addingId = null;
        this.cdr.markForCheck();
        alert(err.error?.message || 'Failed to add to cart');
      }
    });
  }

  addToWishlist(product: any) {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/user/login']);
      return;
    }
    this.addingWishlistId = product._id;
    this.wishlist.addToWishlist(product._id).subscribe({
      next: () => {
        this.addingWishlistId = null;
        this.cdr.markForCheck();
        alert('Added to wishlist!');
      },
      error: (err) => {
        this.addingWishlistId = null;
        this.cdr.markForCheck();
        alert(err.error?.message || 'Failed to add to wishlist');
      }
    });
  }
}


