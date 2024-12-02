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
import { Chart } from 'chart.js/auto';

interface AIInsight {
 title: string;
 score: number;
 impact: string;
 suggestions: string[];
}

interface GoalPrediction {
 goalId: number;
 predictedDate: Date;
 confidenceScore: number;
 adjustedTarget?: number;
 optimizations: string[];
}

@Component({
 selector: 'app-goals',
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
 templateUrl: './goals.component.html',
 styleUrl: './goals.component.css'
})
export class GoalsComponent {
 goalForm: FormGroup;

 aiInsights: AIInsight[] = [
   {
     title: "Goal Optimization Found",
     score: 92,
     impact: "Could reach Emergency Fund goal 2 months earlier",
     suggestions: [
       "Increase monthly contribution by $100",
       "Reallocate entertainment budget",
       "Set up automatic transfers"
     ]
   },
   {
     title: "Spending Pattern Analysis", 
     score: 85,
     impact: "Potential monthly savings: $350",
     suggestions: [
       "Recurring subscriptions optimization",
       "Alternative shopping recommendations",
       "Bulk purchase opportunities"
     ]
   }
 ];

 goalPredictions: GoalPrediction[] = [
   {
     goalId: 1,
     predictedDate: new Date('2024-10-15'),
     confidenceScore: 88,
     adjustedTarget: 11000,
     optimizations: [
       "Current saving rate: Above target",
       "Market interest contribution: +$200/month",
       "Suggested milestone adjustments"
     ]
   }
 ];

 rewards = {
   points: 2450,
   currentLevel: "Budget Master",
   nextMilestone: 3000,
   recentAchievements: [
     {
       title: "Savings Streak",
       description: "Exceeded savings goal for 3 months",
       points: 500,
       date: new Date('2024-11-20')
     },
     {
       title: "Smart Planner",
       description: "Created detailed budget with milestones",
       points: 200,
       date: new Date('2024-11-15')
     }
   ]
 };

 challenges = [
   {
     title: "Coffee Budget Challenge",
     description: "Reduce coffee spending by 25%",
     duration: "30 days",
     reward: 300,
     progress: 65,
     endDate: new Date('2024-12-20')
   },
   {
     title: "Zero Waste Weekend",
     description: "No unnecessary purchases on weekends",
     duration: "2 weeks",
     reward: 200,
     progress: 50,
     endDate: new Date('2024-12-10')
   }
 ];

 goals = [
   {
     id: 1,
     name: 'Emergency Fund',
     category: 'savings',
     targetAmount: 10000,
     currentAmount: 6500,
     targetDate: '2024-12-31',
     progress: 65,
     milestones: [
       { date: '2024-03-31', amount: 7500, title: 'Q1 Target' },
       { date: '2024-06-30', amount: 8500, title: 'Q2 Target' }
     ]
   },
   {
     id: 2,
     name: 'New Car',
     category: 'purchase',
     targetAmount: 25000,
     currentAmount: 15000,
     targetDate: '2025-06-30',
     progress: 60,
     milestones: [
       { date: '2024-12-31', amount: 20000, title: 'Year End Target' }
     ]
   },
   {
     id: 3,
     name: 'Debt Payoff',
     category: 'debt',
     targetAmount: 5000,
     currentAmount: 3000,
     targetDate: '2024-09-30',
     progress: 30,
     milestones: []
   }
 ];

 constructor(private fb: FormBuilder) {
   this.goalForm = this.fb.group({
     name: ['', Validators.required],
     category: ['', Validators.required],
     targetAmount: ['', [Validators.required, Validators.min(1)]],
     targetDate: ['', Validators.required],
     milestones: this.fb.array([])
   });
 }

 ngAfterViewInit() {
   this.initCharts();
 }

 onCreateGoal() {
   if (this.goalForm.valid) {
     const newGoal = {
       id: this.goals.length + 1,
       ...this.goalForm.value,
       currentAmount: 0,
       progress: 0,
       milestones: []
     };
     this.goals.push(newGoal);
     this.goalForm.reset();
     this.rewards.points += 100;
     this.rewards.recentAchievements.unshift({
       title: "Goal Creator",
       description: "Created a new financial goal",
       points: 100,
       date: new Date()
     });
   }
 }

 onUpdateProgress(goal: any) {
   goal.currentAmount += 500;
   goal.progress = (goal.currentAmount / goal.targetAmount) * 100;
   this.rewards.points += 50;
   this.rewards.recentAchievements.unshift({
     title: "Progress Made",
     description: `Made progress on ${goal.name}`,
     points: 50,
     date: new Date()
   });
 }

 getOptimizedGoalPath(goalId: number): void {
   const prediction = this.goalPredictions.find(p => p.goalId === goalId);
   const goal = this.goals.find(g => g.id === goalId);
   
   if (prediction && goal) {
     this.recalculateMilestones(goal, prediction);
     this.updateChart();
   }
 }

 private recalculateMilestones(goal: any, prediction: GoalPrediction): void {
   const monthlyRate = goal.targetAmount / this.getMonthsDifference(new Date(), prediction.predictedDate);
   const newMilestones = this.generateOptimizedMilestones(goal, monthlyRate);
   goal.milestones = newMilestones;
 }

 private getMonthsDifference(start: Date, end: Date): number {
   return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));
 }

 private generateOptimizedMilestones(goal: any, monthlyRate: number): any[] {
   const milestones = [];
   let currentDate = new Date();
   let currentAmount = goal.currentAmount;

   while (currentAmount < goal.targetAmount) {
     currentDate.setMonth(currentDate.getMonth() + 3);
     currentAmount += monthlyRate * 3;

     milestones.push({
       date: new Date(currentDate),
       amount: Math.min(currentAmount, goal.targetAmount),
       title: `Optimized Target: $${currentAmount.toFixed(0)}`
     });
   }

   return milestones;
 }

 private initCharts() {
    const predictionCtx = document.getElementById('predictionChart') as HTMLCanvasElement;
    if (predictionCtx) {
      new Chart(predictionCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Actual Progress',
            data: [5000, 5500, 6000, 6500, 7000, 7500],
            borderColor: '#4f46e5',
            tension: 0.4
          },
          {
            label: 'AI Predicted Path',
            data: [7500, 8200, 8900, 9600, 10300, 11000],
            borderColor: '#22c55e',
            borderDash: [5, 5],
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Goal Progress Prediction'
            },
            legend: {
              position: 'bottom'
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              ticks: {
                callback: value => '$' + value
              }
            }
          }
        }
      });
    }
   const ctx = document.getElementById('progressChart') as HTMLCanvasElement;
   if (ctx) {
     new Chart(ctx, {
       type: 'bar',
       data: {
         labels: this.goals.map(g => g.name),
         datasets: [{
           label: 'Progress (%)',
           data: this.goals.map(g => g.progress),
           backgroundColor: '#4f46e5',
           borderRadius: 4
         }]
       },
       options: {
         responsive: true,
         maintainAspectRatio: false,
         scales: {
           y: {
             beginAtZero: true,
             max: 100,
             ticks: {
               callback: value => value + '%'
             }
           }
         }
       }
     });
   }
 }

 private updateChart(): void {
   this.initCharts();
 }
}