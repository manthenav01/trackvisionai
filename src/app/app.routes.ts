import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard'; // Import the guard
import { DashboardComponent } from './dashboard/dashboard.component'; // Import the new component

export const routes: Routes = [
  {
    path: 'home',
    component: DashboardComponent,
    canActivate: [authGuard]
  },

  // Add other routes here
  // Make sure you have a default or wildcard route if needed
  // { path: '**', redirectTo: '' } // Example wildcard route
];
