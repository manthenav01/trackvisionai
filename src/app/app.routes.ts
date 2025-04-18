import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard'; // Import the guard
import { UploadDocumentComponent } from './upload-document/upload-document.component'; // Import the component

export const routes: Routes = [
  // Example existing route (adjust if you have one)
  // { path: '', component: YourHomeComponent },

  {
    path: 'upload',
    component: UploadDocumentComponent,
    canActivate: [authGuard] // Protect this route with the guard
  },

  // Add other routes here
  // Make sure you have a default or wildcard route if needed
  // { path: '**', redirectTo: '' } // Example wildcard route
];
