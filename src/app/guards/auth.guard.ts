import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import { map, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const auth: Auth = inject(Auth);
  const router: Router = inject(Router);

  return user(auth).pipe(
    take(1), // Take the first emission (current user state)
    map(user => !!user), // Map to boolean: true if user exists, false otherwise
    tap(loggedIn => {
      if (!loggedIn) {
        console.log('Auth Guard: User not logged in, redirecting to login');
        router.navigate(['/']); // Or your login route
      }
    })
  );
};
