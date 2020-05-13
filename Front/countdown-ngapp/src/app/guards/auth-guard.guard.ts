import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class AuthGuardGuard implements CanActivate {

  constructor(
    private router: Router, 
    private authService: AuthService) {}

  canActivate() {
    if (!this.authService.isTokenExpired()) {
      return true;
    }

    this.authService.logout();
    this.router.navigate(['/users/login']);
    return false;
  }

}