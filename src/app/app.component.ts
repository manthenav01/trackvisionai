import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

// Firebase Authentication
import { Auth, authState, signInWithPopup, signOut, GoogleAuthProvider, User } from '@angular/fire/auth';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true, // Ensure component is standalone
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatProgressBarModule,
    MatDialogModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);
  user: User | null = null; // Store user state directly
  private authSubscription: Subscription | null = null;

  ngOnInit() {
    // Subscribe to authentication state changes
    this.authSubscription = authState(this.auth).subscribe(user => {
      this.user = user;
      if (user) {
        // Optional: Navigate to home or main area upon login
        this.router.navigate(['/home']); // Uncomment if you have specific routes
        console.log('User logged in:', user);
      } else {
        // Optional: Navigate to login page upon logout
        this.router.navigate(['/']); // Uncomment if you have specific routes
        console.log('User logged out');
      }
    });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    this.authSubscription?.unsubscribe();
  }

  loginWithGoogle() {
    signInWithPopup(this.auth, new GoogleAuthProvider()).catch(error => {
      console.error("Login failed:", error);
    });
  }

  logout() {
    signOut(this.auth).catch(error => {
      console.error("Logout failed:", error);
    });
  }

  get userInitial(): string | undefined {
    return this.user?.email?.charAt(0).toUpperCase();
  }
}
