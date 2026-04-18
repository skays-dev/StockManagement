import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Category } from '../../core/models/category.model';
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  editingId: number | null = null;
  successMessage = '';
  errorMessage = '';

  form = this.fb.group({
    name: ['', [Validators.required]],
    description: ['']
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: data => this.categories = data,
      error: () => this.errorMessage = 'Failed to load categories.'
    });
  }

  submit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue() as { name: string; description?: string; };

    const request = this.editingId
      ? this.categoryService.update(this.editingId, payload)
      : this.categoryService.create(payload);

    request.subscribe({
      next: () => {
        this.successMessage = this.editingId ? 'Category updated.' : 'Category created.';
        this.cancelEdit();
        this.loadCategories();
      },
      error: (error) => {
        this.errorMessage = error?.error ?? 'Operation failed.';
      }
    });
  }

  edit(category: Category): void {
    this.editingId = category.id;
    this.form.patchValue({
      name: category.name,
      description: category.description ?? ''
    });
  }

  cancelEdit(): void {
    this.editingId = null;
    this.form.reset({ name: '', description: '' });
  }

  delete(id: number): void {
    this.successMessage = '';
    this.errorMessage = '';

    this.categoryService.delete(id).subscribe({
      next: () => {
        this.successMessage = 'Category deleted.';
        this.loadCategories();
      },
      error: (error) => {
        this.errorMessage = error?.error ?? 'Delete failed.';
      }
    });
  }
}
