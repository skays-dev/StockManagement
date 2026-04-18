import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Category, CategoryPayload } from '../models/category.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly baseUrl = `${environment.apiBaseUrl}/categories`;

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  create(payload: CategoryPayload): Observable<Category> {
    return this.http.post<Category>(this.baseUrl, payload);
  }

  update(id: number, payload: CategoryPayload): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
