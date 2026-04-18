import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { StockMovement, StockMovementPayload } from '../models/stock-movement.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StockMovementService {
  private readonly baseUrl = `${environment.apiBaseUrl}/stock-movements`;

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<StockMovement[]> {
    return this.http.get<StockMovement[]>(this.baseUrl);
  }

  create(payload: StockMovementPayload): Observable<unknown> {
    return this.http.post(this.baseUrl, payload);
  }
}
