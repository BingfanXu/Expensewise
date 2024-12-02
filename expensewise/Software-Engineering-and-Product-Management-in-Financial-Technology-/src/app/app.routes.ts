import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'analytics',
    loadComponent: () => import('./features/analytics/analytics/analytics.component')
      .then(m => m.AnalyticsComponent)
  },
  {
    path: 'security',
    loadComponent: () => import('./features/security/security/security.component')
      .then(m => m.SecurityComponent)
  },
  {
    path: 'support',
    loadComponent: () => import('./features/support/support/support.component')
      .then(m => m.SupportComponent)
  },
  {
    path: 'budget',
    loadComponent: () => import('./features/budget/budget/budget.component')
      .then(m => m.BudgetComponent)
  },
  {
    path: 'goals',
    loadComponent: () => import('./features/goals/goals/goals.component')
      .then(m => m.GoalsComponent)
  },
  {
    path: '',
    redirectTo: 'security',
    pathMatch: 'full'
  }
];