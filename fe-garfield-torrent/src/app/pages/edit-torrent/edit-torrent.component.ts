import { Component } from '@angular/core';
import { TorrentService } from '../../shared/services/Torrent/torrent.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../shared/services/Notification/notification.service';
import { Torrent, TorrentCategory } from '../../shared/models/Torrent';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, catchError, delay, distinctUntilChanged, first, map, of, switchMap, tap } from 'rxjs';
import { ResponseErrorToString } from '../../shared/models/Response';

@Component({
  selector: 'app-edit-torrent',
  templateUrl: './edit-torrent.component.html',
  styleUrls: ['./edit-torrent.component.scss']
})
export class EditTorrentComponent {

  isLoading = new BehaviorSubject(true);
  categories = [TorrentCategory.EBOOK, TorrentCategory.MOVIE, TorrentCategory.SOFTWARE, TorrentCategory.XXX];
  torrent: Observable<Torrent>;

  editTorrentForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  })

  constructor(
    private route: ActivatedRoute,
    private torrentService: TorrentService,
    private router: Router,
    private notifications: NotificationService
  ) {
    this.torrent = this.route.params.pipe(
      distinctUntilChanged(),
      switchMap(params => this.torrentService.getTorrentById(params['id'])),
      delay(200),
    );

    this.torrent.subscribe(torrent => {
      this.editTorrentForm.controls['title'].setValue(torrent.title);
      this.editTorrentForm.controls['category'].setValue(torrent.category);
      this.editTorrentForm.controls['description'].setValue(torrent.description);
      this.isLoading.next(false);
    })

  }


  updateTorrent() {
    this.isLoading.next(true);

    this.torrent.pipe(
      map(torrent => {
        const editedTorrent: Partial<Torrent> = {
          id: torrent.id!,
          title: this.editTorrentForm.controls['title'].value!,
          category: this.editTorrentForm.controls['category'].value! as TorrentCategory,
          description: this.editTorrentForm.controls['description'].value!
        };
        return editedTorrent;
      }),
      switchMap(editedTorrent => this.torrentService.updateTorrent(editedTorrent)),
      catchError(err => {
        this.notifications.changeMessage('error', 'Something went wrong', ResponseErrorToString(err) + '\n Click to dismiss...');
        return of(null);
      }),
      delay(200),
      first()
    ).subscribe(result => {
      this.isLoading.next(false);
      if (result) {
        this.notifications.changeMessage('success', 'Torrent edited', 'Click to dismiss...')
        this.router.navigate(['/browser']);
      }
    })

  }
}
