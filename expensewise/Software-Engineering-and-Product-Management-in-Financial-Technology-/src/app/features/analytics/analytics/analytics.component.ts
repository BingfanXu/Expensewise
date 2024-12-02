import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements AfterViewInit {
  @ViewChild('salesChart') salesChart!: ElementRef;
  @ViewChild('customersChart') customersChart!: ElementRef;

  metrics = {
    monthlyRevenue: 247892,
    monthlyRevenueChange: 12.3,
    averageOrder: 168,
    averageOrderChange: 5.8,
    conversionRate: 4.2,
    conversionRateChange: -0.3,
    activeCustomers: 1485,
    activeCustomersChange: 8.4
  };

  ngAfterViewInit() {
    this.initializeSalesChart();
    this.initializeCustomersChart();
  }

  private initializeSalesChart() {
    const ctx = this.salesChart.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Oct 26', 'Nov 1', 'Nov 7', 'Nov 13', 'Nov 19', 'Nov 25'],
        datasets: [{
          label: 'Sales',
          data: [8420, 9120, 9580, 9100, 9200, 10200],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(0, 0, 0, 0.05)' }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }

  private initializeCustomersChart() {
    const ctx = this.customersChart.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
        datasets: [{
          label: 'Customers',
          data: [245, 288, 332, 378, 442, 485],
          backgroundColor: '#6366f1',
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(0, 0, 0, 0.05)' }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }
}
