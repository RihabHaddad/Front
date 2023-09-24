import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';
import { AuthenticationService } from '../components/login/AuthentificationService';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    private  auth: AuthenticationService ,
    private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.auth.currentUserValue;
    if (currentUser) {
        console.log("User is logged in, allowing access.");
        return true;
    }

    console.log("User is not logged in, redirecting to login.");
    this.authService.logout();
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
    return false;
}}