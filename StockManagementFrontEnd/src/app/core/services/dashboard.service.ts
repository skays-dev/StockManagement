import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DashboardSummary } from '../models/dashboard.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly baseUrl = `${environment.apiBaseUrl}/dashboard`;

  constructor(private readonly http: HttpClient) {}

  getSummary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(this.baseUrl);
  }
}
