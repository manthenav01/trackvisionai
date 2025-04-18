import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const auth: Auth = inject(Auth);
  const router: Router = inject(Router);

  return user(auth).pipe(
    take(1), // Take the first emission (current user state) and complete
    map(user => {
      if (user) {
        return true; // User is logged in, allow access
      } else {
        // User is not logged in, redirect to login page (assuming '/' is login or home)
        router.navigate(['/']);
        return false;
      }
    })
  );
};
