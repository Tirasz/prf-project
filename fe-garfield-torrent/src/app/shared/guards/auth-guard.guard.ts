import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/Auth/auth.service';
import { NotificationService } from '../services/Notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private notification: NotificationService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    this.authService.refreshCurrentUser();
    return this.authService.currentUser.asObservable().pipe(
      map(userData => {
        if (Boolean(userData))
          return true;
        this.notification.changeMessage('warning', 'Log in to access this page!', 'Click to dismiss...');
        return this.router.createUrlTree(['/login']);
      })
    )
  }

}
