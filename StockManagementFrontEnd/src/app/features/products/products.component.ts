import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Category } from '../../core/models/category.model';
import { Product } from '../../core/models/product.model';
import { CategoryService } from '../../core/services/category.service';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  editingId: number | null = null;
  successMessage = '';
  errorMessage = '';

  form = this.fb.group({
    name: ['', [Validators.required]],
    sku: ['', [Validators.required]],
    quantity: [0, [Validators.required]],
    unitPrice: [0, [Validators.required]],
    minimumStock: [0, [Validators.required]],
    categoryId: [0, [Validators.required]]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: data => this.products = data,
      error: () => this.errorMessage = 'Failed to load products.'
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: data => this.categories = data
    });
  }

  submit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue() as any;

    const request = this.editingId
      ? this.productService.update(this.editingId, payload)
      : this.productService.create(payload);

    request.subscribe({
      next: () => {
        this.successMessage = this.editingId ? 'Product updated.' : 'Product created.';
        this.cancelEdit();
        this.loadProducts();
      },
      error: (error) => {
        this.errorMessage = error?.error ?? 'Operation failed.';
      }
    });
  }

  edit(product: Product): void {
    this.editingId = product.id;
    this.form.patchValue({
      name: product.name,
      sku: product.sku,
      quantity: product.quantity,
      unitPrice: product.unitPrice,
      minimumStock: product.minimumStock,
      categoryId: product.categoryId
    });
  }

  cancelEdit(): void {
    this.editingId = null;
    this.form.reset({
      name: '',
      sku: '',
      quantity: 0,
      unitPrice: 0,
      minimumStock: 0,
      categoryId: 0
    });
  }

  delete(id: number): void {
    this.productService.delete(id).subscribe({
      next: () => {
        this.successMessage = 'Product deleted.';
        this.loadProducts();
      },
      error: (error) => {
        this.errorMessage = error?.error ?? 'Delete failed.';
      }
    });
  }
}
