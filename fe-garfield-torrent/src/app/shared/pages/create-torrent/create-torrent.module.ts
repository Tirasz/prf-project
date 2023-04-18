import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateTorrentRoutingModule } from './create-torrent-routing.module';
import { CreateTorrentComponent } from './create-torrent.component';


@NgModule({
  declarations: [
    CreateTorrentComponent
  ],
  imports: [
    CommonModule,
    CreateTorrentRoutingModule
  ]
})
export class CreateTorrentModule { }
