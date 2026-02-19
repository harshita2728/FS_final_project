import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { ProductService } from '../../services/product';
import { Cart } from '../../services/cart';
import { Wishlist } from '../../services/wishlist';
import { UserAuthService } from '../../services/user-auth';
import { filter } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-collection',
  imports: [CommonModule],
  templateUrl: './collection.html',
  styleUrls: ['./collection.css']
})
export class CollectionComponent implements OnInit {

  products: any[] = [];
  addingId: string | null = null;
  addingWishlistId: string | null = null;

  constructor(
    private productService: ProductService,
    private cart: Cart,
    private wishlist: Wishlist,
    public auth: UserAuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.loadProducts());
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error loading products', err)
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



  // ngOnInit(): void {
  //   if (isPlatformBrowser(this.platformId)) {
  //     console.log('Collection running in browser');

  //     this.productService.getProducts().subscribe({
  //       next: (res) => {
  //         console.log('Products:', res);
  //         this.products = res;
  //       },
  //       error: (err) => console.error(err)
  //     });
  //   }
  // }


// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// @Component({
//   selector: 'app-collection',
//   imports: [CommonModule], 
//   templateUrl: './collection.html',
//   styleUrls: ['./collection.css']
// })
// export class CollectionComponent {

//   products = [
//     {
//       id: 1,
//       name: 'Classic Cotton T-Shirt',
//       price: '₹499',
//       image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b'
//     },
//     {
//       id: 2,
//       name: 'Elegant Summer Dress',
//       price: '₹1299',
//       image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'
//     },
//     {
//       id: 3,
//       name: 'Denim Jacket',
//       price: '₹1899',
//       image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38'
//     },
//     {
//       id: 4,
//       name: 'Casual Sneakers',
//       price: '₹2499',
//       image: 'https://img.tatacliq.com/images/i18//437Wx649H/MP000000022848373_437Wx649H_202407091408301.jpeg'
//     },
//     {
//       id: 5,
//       name: 'Leather Handbag',
//       price: '₹2999',
//       image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c'
//     },
//     {
//       id: 6,
//       name: 'Stylish Wrist Watch',
//       price: '₹1999',
//       image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3'
//     },
//     {
//       id: 7,
//       name: 'Trendy Sunglasses',
//       price: '₹899',
//       image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083'
//     },
//     {
//       id: 8,
//       name: 'Premium Headphones',
//       price: '₹3499',
//       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaKbjskpXKySZ6GVvTfA6V-aNnZu7rtBvF5Q&s'
//     },
//     {
//       id: 9,
//       name: 'Formal Office Shirt',
//       price: '₹999',
//       image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c'
//     },
//     {
//       id: 10,
//       name: 'Casual Blue Jeans',
//       price: '₹1599',
//       image: 'https://images.unsplash.com/photo-1542272604-787c3835535d'
//     },
//     {
//       id: 11,
//       name: 'Winter Hoodie',
//       price: '₹1799',
//       image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQWnrDkd4XkSUhFNGYRQlsBrZINRhJMo2Ks4_02oVxOu9GCgw6XpMQVQ3-wYSZ63xvxe6EfnQzIQjSviJ8Xb1r4sjqO014-zOpLgmgL7JiiaaeNf90vBnmh'
//     },
//     {
//       id: 12,
//       name: 'Sports Running Shoes',
//       price: '₹3299',
//       image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQVpo78MDOfQ4oiqyzqGiijBct6eqXgMBVfv9HDsGycw5DMJhIIzZ6FHBhCKqnflP6wqWcQvwk0Qrzrzrgk_gq1wzvkCLgS9mgxPbRhDw8ZiVmfhOJr1NGo93Ca'
//     },
//     {
//       id: 13,
//       name: 'Travel Backpack',
//       price: '₹2499',
//       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqWLNY8DIFIzIvGNAY79yWmQ_FFO82MBXBRQ&s'
//     },
//     {
//       id: 14,
//       name: 'Minimalist Wallet',
//       price: '₹799',
//       image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c'
//     },
//     {
//       id: 15,
//       name: 'Wireless Earbuds',
//       price: '₹2999',
//       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThWedfdcXMmFNb6IPGtPGAXEBexqO2top7sw&s'
//     },
//     {
//       id: 16,
//       name: 'Baseball Cap',
//       price: '₹599',
//       image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTSKG70Z52T1enoZbpP8OH12VajvMn8Oy5_DhTiDgY2qIP0XvjPYLRE5QYisj2TXLhfxrfaykSKbtSeEftnjtarYNm7-wQiCsrtacV3LB_zID1OavtZNAcVYA'
//     }
//   ];

// }