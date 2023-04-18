import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TorrentRoutingModule } from './torrent-routing.module';
import { TorrentComponent } from './torrent.component';


@NgModule({
  declarations: [
    TorrentComponent
  ],
  imports: [
    CommonModule,
    TorrentRoutingModule
  ]
})
export class TorrentModule { }
