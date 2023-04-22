import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/Auth/auth.service';
import { NotificationService } from '../services/Notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private notification: NotificationService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.authService.refreshCurrentUser();
    return this.authService.currentUser.pipe(
      map(user => user?.accessLevel === 3),
      tap(result => {
        if (!result) {
          this.notification.changeMessage('warning', 'Only torrent owners can edit torrents!', 'Click to dismiss...')
          this.router.navigate(['/browser']);
        }
      })
    )
  }

}
