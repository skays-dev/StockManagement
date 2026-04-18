import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from '../../core/models/product.model';
import { StockMovement } from '../../core/models/stock-movement.model';
import { ProductService } from '../../core/services/product.service';
import { StockMovementService } from '../../core/services/stock-movement.service';

@Component({
  selector: 'app-stock-movements',
  templateUrl: './stock-movements.component.html'
})
export class StockMovementsComponent implements OnInit {
  products: Product[] = [];
  movements: StockMovement[] = [];
  successMessage = '';
  errorMessage = '';

  form = this.fb.group({
    productId: [0, [Validators.required]],
    type: ['IN', [Validators.required]],
    quantity: [1, [Validators.required]],
    note: ['']
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly productService: ProductService,
    private readonly movementService: StockMovementService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadMovements();
  }

  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: data => this.products = data
    });
  }

  loadMovements(): void {
    this.movementService.getAll().subscribe({
      next: data => this.movements = data,
      error: () => this.errorMessage = 'Failed to load stock movements.'
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

    this.movementService.create(payload).subscribe({
      next: () => {
        this.successMessage = 'Stock movement saved.';
        this.form.patchValue({
          productId: 0,
          type: 'IN',
          quantity: 1,
          note: ''
        });
        this.loadProducts();
        this.loadMovements();
      },
      error: (error) => {
        this.errorMessage = error?.error ?? 'Operation failed.';
      }
    });
  }
}
