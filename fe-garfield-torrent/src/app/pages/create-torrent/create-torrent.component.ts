import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/services/Notification/notification.service';
import { TorrentService } from '../../shared/services/Torrent/torrent.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, delay, first, map, of, switchMap } from 'rxjs';
import { Torrent, TorrentCategory } from '../../shared/models/Torrent';
import { AuthService } from '../../shared/services/Auth/auth.service';
import { ResponseErrorToString } from '../../shared/models/Response';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-torrent',
  templateUrl: './create-torrent.component.html',
  styleUrls: ['./create-torrent.component.scss']
})
export class CreateTorrentComponent {

  isLoading = new BehaviorSubject(false);
  categories = [TorrentCategory.EBOOK, TorrentCategory.MOVIE, TorrentCategory.SOFTWARE, TorrentCategory.XXX];

  editTorrentForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  })

  constructor(
    private location: Location,
    private torrentService: TorrentService,
    private router: Router,
    private notifications: NotificationService,
    private authService: AuthService
  ) { }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  goBack() {
    this.location.back();
  }

  createTorrent() {
    this.isLoading.next(true);

    this.authService.currentUser.pipe(
      map(currentUser => {
        const newTorrent: Torrent = {
          title: this.editTorrentForm.controls['title'].value!,
          category: this.editTorrentForm.controls['category'].value! as TorrentCategory,
          description: this.editTorrentForm.controls['description'].value!,
          seeders: this.getRandomInt(100),
          leechers: this.getRandomInt(100),
          owner: currentUser!
        };
        return newTorrent;
      }),
      switchMap(newTorrent => this.torrentService.createTorrent(newTorrent)),
      catchError(err => {
        this.notifications.changeMessage('error', 'Something went wrong', ResponseErrorToString(err) + '\n Click to dismiss...');
        return of(null);
      }),
      delay(200),
      first()
    ).subscribe(result => {
      this.isLoading.next(false);
      if (result) {
        this.notifications.changeMessage('success', 'Torrent uploaded', 'Click to dismiss...')
        this.router.navigate(['/browser']);
      }
    })
  }
}
