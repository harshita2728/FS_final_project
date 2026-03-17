import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-product.html',
})
export class AddProductComponent implements OnInit {

  isEdit : boolean = false;
  productId: string = "";
  selectedFile!: File;

product = {
    name: '',
    price: '',
    category: 'women',
      image: ''
  };
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  onFileSelect(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      console.log('Route ID:', id);

    if (id) {
      // ✏️ EDIT MODE
      this.productId = id;
      this.isEdit = true;
      this.loadProduct();
    }
  });
}

  loadProduct(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: (res:any ) => {
        console.log('Product loaded for edit:', res);
        this.product.name = res.name;   // 🔥 THIS AUTOFILLS FORM
        this.product.price = res.price;
        this.product.category = res.category || 'women';
        this.product.image = res.image;
        this.cdr.detectChanges(); // 🔄 UPDATE VIEW WITH LOADED DATA

      },
      error: (err) => console.error(err)
    });
  }

submit(form: any): void {

  const formData = new FormData();
  formData.append('name', this.product.name);
  formData.append('price', this.product.price);
  formData.append('category', this.product.category);

  if (this.selectedFile) {
    formData.append('image', this.selectedFile);
  }

  if (this.isEdit) {

    this.productService.updateProduct(this.productId, formData)
      .subscribe(() => {
        alert('Product updated successfully');
        this.router.navigate(['/admin/dashboard/manage-products']);
      });

  } else {

    this.productService.addProduct(formData)
      .subscribe(() => {

        alert('Product added successfully');

        form.resetForm();

        this.router.navigate(['/admin/dashboard/manage-products']);
      });
    }
  }
}    // } else {
    //   // ADD
    //   this.productService.addProduct(this.product)
    //     .subscribe(() => {
    //       if(!this.isEdit) {
    //       this.product = {
    //           name: '',
    //           price: ''
    //         };}
    //       alert('Product added successfully');
    //         // reset only in ADD mode
    //         form.resetForm();
    //       this.router.navigate(['admin/manage-products']);
    //     });

