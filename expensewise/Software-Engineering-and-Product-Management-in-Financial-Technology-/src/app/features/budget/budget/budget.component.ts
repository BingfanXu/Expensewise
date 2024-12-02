// src/app/features/budget/budget/budget.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatProgressBarModule
  ],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css'
})
export class BudgetComponent {
  budgetForm: FormGroup;
  
  categories = [
    { id: 1, name: 'Housing', icon: 'home' },
    { id: 2, name: 'Transportation', icon: 'directions_car' },
    { id: 3, name: 'Food & Groceries', icon: 'restaurant' },
    { id: 4, name: 'Entertainment', icon: 'movie' },
    { id: 5, name: 'Healthcare', icon: 'local_hospital' },
    { id: 6, name: 'Shopping', icon: 'shopping_cart' }
  ];

  budgets = [
    {
      category: 'Housing',
      allocated: 1500,
      spent: 1200,
      remaining: 300,
      transactions: [
        { date: '2024-03-01', description: 'Rent Payment', amount: 1000 },
        { date: '2024-03-05', description: 'Utilities', amount: 200 }
      ]
    },
    {
      category: 'Food & Groceries',
      allocated: 600,
      spent: 450,
      remaining: 150,
      transactions: [
        { date: '2024-03-02', description: 'Grocery Store', amount: 250 },
        { date: '2024-03-08', description: 'Restaurant', amount: 200 }
      ]
    },
    {
      category: 'Transportation',
      allocated: 400,
      spent: 280,
      remaining: 120,
      transactions: [
        { date: '2024-03-03', description: 'Gas', amount: 180 },
        { date: '2024-03-07', description: 'Parking', amount: 100 }
      ]
    }
  ];

  monthlySummary = {
    totalBudget: 2500,
    totalSpent: 1930,
    totalRemaining: 570,
    savingsGoal: 500,
    currentSavings: 300
  };

  constructor(private fb: FormBuilder) {
    this.budgetForm = this.fb.group({
      category: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  onCreateBudget() {
    if (this.budgetForm.valid) {
      console.log('New budget:', this.budgetForm.value);
    }
  }

  calculateProgress(spent: number, allocated: number): number {
    return (spent / allocated) * 100;
  }

  getProgressColor(spent: number, allocated: number): string {
    const percentage = (spent / allocated) * 100;
    if (percentage >= 90) return 'warn';
    if (percentage >= 75) return 'accent';
    return 'primary';
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  getMonthProgress(): number {
    const today = new Date();
    return (today.getDate() / new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()) * 100;
  }
}