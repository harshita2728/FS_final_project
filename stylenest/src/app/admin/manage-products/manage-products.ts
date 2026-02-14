import { Component, OnInit,ChangeDetectorRef} from '@angular/core';
import { CommonModule} from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product';


@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-products.html',
})
export class ManageProductsComponent implements OnInit {
  
 loading = true;
products: any[] = [];
  constructor(
    private productService: ProductService, 
    private router: Router,
    private cdr: ChangeDetectorRef  
  ) {}




ngOnInit():void{
 
    this.loadProducts();
  
}

loadProducts():void {
  this.productService.getProducts().subscribe({
    next: (res) => {
      console.log('Products:', res);
      this.products = res ;
      this.loading = false;
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Error loading products', err);
      this.loading = false;
      this.cdr.detectChanges();
    }
  });
}



  deleteProduct(id: string): void {
    if (!confirm('Are you sure you want to delete this product?')) 
      return;
    

     this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  
  }
  logout(): void {

    localStorage.removeItem('adminToken');

  this.router.navigate(['/login']);
}
editProduct(id: string){
  console.log('Editing product id:', id);
  this.router.navigate(['./admin/add-product', id]);
}
  }