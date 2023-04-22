import { Component } from '@angular/core';
import { TorrentService } from '../../shared/services/Torrent/torrent.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../shared/services/Notification/notification.service';
import { TorrentCategory } from '../../shared/models/Torrent';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-torrent',
  templateUrl: './edit-torrent.component.html',
  styleUrls: ['./edit-torrent.component.scss']
})
export class EditTorrentComponent {

  isLoading = false;
  categories = [TorrentCategory.EBOOK, TorrentCategory.MOVIE, TorrentCategory.SOFTWARE, TorrentCategory.XXX];

  editTorrentForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  })
  constructor(
    private activatedRoute: ActivatedRoute,
    private torrentService: TorrentService,
    private router: Router,
    private notifications: NotificationService
  ) { }


  updateTorrent() {

  }
}
