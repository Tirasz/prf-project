import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, of, tap, zip } from 'rxjs';
import { TorrentService } from '../services/Torrent/torrent.service';
import { NotificationService } from '../services/Notification/notification.service';
import { AuthService } from '../services/Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsOwnerGuard implements CanActivate {

  constructor(
    private torrentService: TorrentService,
    private router: Router,
    private notification: NotificationService,
    private authService: AuthService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const torrentId = route.paramMap.get('id');
    this.authService.refreshCurrentUser();

    if (!torrentId) {
      return of(false);
    }

    return zip(this.authService.currentUser, this.torrentService.getTorrentById(torrentId)).pipe(
      map(([user, torrent]) => {
        return user?.id! === torrent.owner.id!;
      }),
      tap(result => {
        if (!result)
          this.notification.changeMessage('warning', 'Only torrent owners can edit torrents!', 'Click to dismiss...')
      })
    )
  }

}
