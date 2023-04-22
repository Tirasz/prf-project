import { Component, OnInit } from '@angular/core';
import { TorrentService } from '../../shared/services/Torrent/torrent.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Torrent } from '../../shared/models/Torrent';
import { AuthService } from '../../shared/services/Auth/auth.service';
import { Observable, catchError, distinctUntilChanged, map, merge, mergeMap, of, switchMap, tap, zip } from 'rxjs';
import { NotificationService } from '../../shared/services/Notification/notification.service';

@Component({
  selector: 'app-torrent',
  templateUrl: './torrent.component.html',
  styleUrls: ['./torrent.component.scss']
})
export class TorrentComponent implements OnInit {

  torrent: Observable<Torrent | null>;
  isOwner: Observable<boolean>;
  isAdmin: Observable<boolean>;

  constructor(
    private torrentService: TorrentService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private notifications: NotificationService
  ) {
    this.torrent = this.route.params.pipe(
      distinctUntilChanged(),
      switchMap(params => this.torrentService.getTorrentById(params['id'])),
      catchError(err => {
        this.router.navigate(['/browser']);
        this.notifications.changeMessage('error', 'Something went wrong...', 'Click to dismiss...');
        return of(null)
      })
    );

    this.isOwner = zip(this.torrent, this.authService.currentUser).pipe(
      map(([torrent, user]) => {
        return torrent!.owner.id! === user!.id;
      }),
      tap(res => console.log('IS OWNER: ', res))
    )

    this.isAdmin = this.authService.currentUser.pipe(
      map(user => user!.accessLevel === 3),
      tap(res => console.log('IS ADMIN: ', res))
    )

  }

  ngOnInit(): void { }

  toEdit(id: string) {
    this.router.navigate(['/edit-torrent', id]);
  }

  deleteTorrent(torrent: Torrent) {
    this.torrentService.deleteTorrent(torrent).subscribe(() => {
      this.router.navigate(['/browser']);
      this.notifications.changeMessage('success', 'Torrent deleted', 'Click to dismiss..');
    })
  }

}
