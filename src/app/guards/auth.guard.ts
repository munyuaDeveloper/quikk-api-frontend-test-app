import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      // If the user is authenticated, allow access to the route
      return true;
    } else {
      // If the user is not authenticated, redirect to the login page
      this.router.navigate(['/home']);
      return false;
    }
  }
}
