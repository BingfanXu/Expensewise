import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule and Routes
import { AppComponent } from './app.component'; // Importing the standalone component

// Corrected import paths based on your folder structure
import { SecurityComponent } from './features/security/security/security.component';
import { SupportComponent } from './features/support/support/support.component';
import { AnalyticsComponent } from './features/analytics/analytics/analytics.component';
import { BudgetComponent } from './features/budget/budget/budget.component';
import { GoalsComponent } from './features/goals/goals/goals.component';

// Define the routes for the application
const appRoutes: Routes = [
  { path: 'security', component: SecurityComponent },
  { path: 'support', component: SupportComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'budget', component: BudgetComponent },
  { path: 'goals', component: GoalsComponent },
  { path: '', redirectTo: '/goals', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/goals' } // Fallback for any invalid route
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AppComponent // Import the standalone component here instead of declaring it
  ],
  providers: []
})
export class AppModule { }