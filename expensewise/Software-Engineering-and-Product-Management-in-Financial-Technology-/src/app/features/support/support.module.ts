// src/app/features/support/support/support.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule
  ],
  template: `
    <div class="support-container">
      <!-- Help Center Section -->
      <mat-card class="support-section">
        <mat-card-header>
          <mat-icon>help</mat-icon>
          <mat-card-title>Help Center</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Search Help Articles</mat-label>
            <input matInput placeholder="Type your question">
            <mat-icon matSuffix>search</mat-icon>
          </mat-form-field>

          <div class="faq-list">
            <div class="faq-category" *ngFor="let category of faqCategories">
              <h3>
                <mat-icon>{{category.icon}}</mat-icon>
                {{category.name}}
              </h3>
              <div class="faq-items">
                <div class="faq-item" *ngFor="let faq of category.faqs">
                  <h4>{{faq.question}}</h4>
                  <p>{{faq.answer}}</p>
                </div>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Create Ticket Section -->
      <mat-card class="support-section">
        <mat-card-header>
          <mat-icon>create</mat-icon>
          <mat-card-title>Create Support Ticket</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="ticketForm" (ngSubmit)="onSubmitTicket()">
            <mat-form-field appearance="outline">
              <mat-label>Subject</mat-label>
              <input matInput formControlName="subject">
              <mat-error *ngIf="ticketForm.get('subject')?.hasError('required')">
                Subject is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Category</mat-label>
              <mat-select formControlName="category">
                <mat-option value="technical">Technical Issue</mat-option>
                <mat-option value="account">Account Related</mat-option>
                <mat-option value="billing">Billing Question</mat-option>
                <mat-option value="feature">Feature Request</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Description</mat-label>
              <textarea matInput rows="6" formControlName="description"></textarea>
              <mat-error *ngIf="ticketForm.get('description')?.hasError('required')">
                Description is required
              </mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit"
                    [disabled]="ticketForm.invalid">
              Submit Ticket
            </button>
          </form>
        </mat-card-content>
      </mat-card>

      <!-- Ticket List Section -->
      <mat-card class="support-section">
        <mat-card-header>
          <mat-icon>list</mat-icon>
          <mat-card-title>My Tickets</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="tickets-list">
            <div class="ticket-item" *ngFor="let ticket of tickets">
              <div class="ticket-header">
                <h3>{{ticket.subject}}</h3>
                <span class="ticket-status" [class]="ticket.status.toLowerCase()">
                  {{ticket.status}}
                </span>
              </div>
              <div class="ticket-meta">
                Ticket #{{ticket.id}} • {{ticket.date}}
              </div>
              <p class="ticket-description">{{ticket.description}}</p>
              <div class="ticket-actions">
                <button mat-button color="primary">View Details</button>
                <button mat-button color="accent">Update</button>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .support-container {
      max-width: 1000px;
      margin: 20px auto;
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .support-section {
      margin-bottom: 20px;
    }

    .search-field {
      width: 100%;
      margin-bottom: 20px;
    }

    .faq-list {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .faq-category {
      h3 {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 0 0 16px;
        color: #333;
        
        mat-icon {
          color: #666;
        }
      }
    }

    .faq-items {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-left: 32px;
    }

    .faq-item {
      h4 {
        margin: 0 0 8px;
        color: #444;
      }

      p {
        margin: 0;
        color: #666;
      }
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-width: 600px;
    }

    .tickets-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .ticket-item {
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      padding: 16px;
      background: #fff;

      .ticket-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;

        h3 {
          margin: 0;
          font-size: 18px;
          color: #333;
        }
      }

      .ticket-status {
        padding: 4px 12px;
        border-radius: 16px;
        font-size: 14px;
        font-weight: 500;

        &.open {
          background: #e3f2fd;
          color: #1976d2;
        }

        &.in-progress {
          background: #fff3e0;
          color: #f57c00;
        }

        &.closed {
          background: #e8f5e9;
          color: #388e3c;
        }
      }

      .ticket-meta {
        font-size: 14px;
        color: #666;
        margin-bottom: 12px;
      }

      .ticket-description {
        margin: 0 0 16px;
        color: #444;
      }

      .ticket-actions {
        display: flex;
        gap: 8px;
      }
    }

    mat-card-header {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 8px;

      mat-icon {
        color: #666;
      }
    }

    @media (max-width: 600px) {
      .support-container {
        padding: 10px;
      }

      .ticket-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
    }
  `]
})
export class SupportComponent {
  ticketForm: FormGroup;

  faqCategories = [
    {
      name: 'Getting Started',
      icon: 'school',
      faqs: [
        {
          question: 'How do I create an account?',
          answer: 'Click the Sign Up button and follow the registration process...'
        },
        {
          question: 'How do I reset my password?',
          answer: 'Use the Forgot Password link on the login page...'
        }
      ]
    },
    {
      name: 'Account & Security',
      icon: 'security',
      faqs: [
        {
          question: 'How do I enable 2FA?',
          answer: 'Go to Security Settings and follow the 2FA setup process...'
        }
      ]
    }
  ];

  tickets = [
    {
      id: 'T-1001',
      subject: 'Cannot access dashboard',
      description: 'I am unable to access my dashboard after the recent update.',
      status: 'Open',
      date: '2024-03-10',
      category: 'technical'
    },
    {
      id: 'T-1002',
      subject: 'Billing inquiry',
      description: 'Question about my last invoice.',
      status: 'In Progress',
      date: '2024-03-09',
      category: 'billing'
    }
  ];

  constructor(private fb: FormBuilder) {
    this.ticketForm = this.fb.group({
      subject: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  onSubmitTicket() {
    if (this.ticketForm.valid) {
      console.log('Ticket submitted:', this.ticketForm.value);
    }
  }
}