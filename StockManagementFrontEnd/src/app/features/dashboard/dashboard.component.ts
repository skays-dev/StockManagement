import { Component, OnInit } from '@angular/core';
import { DashboardSummary } from '../../core/models/dashboard.model';
import { DashboardService } from '../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  summary?: DashboardSummary;
  errorMessage = '';

  constructor(private readonly dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadSummary();
  }

  loadSummary(): void {
    this.dashboardService.getSummary().subscribe({
      next: data => this.summary = data,
      error: () => this.errorMessage = 'Failed to load dashboard summary.'
    });
  }
}
