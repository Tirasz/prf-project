import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditTorrentRoutingModule } from './edit-torrent-routing.module';
import { EditTorrentComponent } from './edit-torrent.component';


@NgModule({
  declarations: [
    EditTorrentComponent
  ],
  imports: [
    CommonModule,
    EditTorrentRoutingModule
  ]
})
export class EditTorrentModule { }
