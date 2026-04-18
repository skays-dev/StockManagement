import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Product, ProductPayload } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly baseUrl = `${environment.apiBaseUrl}/products`;

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  create(payload: ProductPayload): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, payload);
  }

  update(id: number, payload: ProductPayload): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
