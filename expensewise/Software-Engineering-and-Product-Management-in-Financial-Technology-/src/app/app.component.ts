import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span>ExpenseWise</span>
    </mat-toolbar>

    <mat-sidenav-container>
      <mat-sidenav mode="side" opened>
        <mat-nav-list>
          <a mat-list-item routerLink="/security" routerLinkActive="active">Security</a>
          <a mat-list-item routerLink="/support" routerLinkActive="active">Support</a>
          <a mat-list-item routerLink="/analytics" routerLinkActive="active">Analytics</a>
          <a mat-list-item routerLink="/budget" routerLinkActive="active">Budget</a>
          <a mat-list-item routerLink="/goals" routerLinkActive="active">Goals</a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    
    mat-sidenav-container {
      flex: 1;
    }
    
    mat-sidenav {
      width: 200px;
      background: #f5f5f5;
    }

    mat-sidenav-content {
      padding: 20px;
    }

    .active {
      background-color: rgba(0,0,0,0.1);
    }
  `]
})
export class AppComponent {
  title = 'ExpenseWise';
}