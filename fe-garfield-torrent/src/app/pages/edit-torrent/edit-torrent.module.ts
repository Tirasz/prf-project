import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditTorrentRoutingModule } from './edit-torrent-routing.module';
import { EditTorrentComponent } from './edit-torrent.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select'

@NgModule({
  declarations: [
    EditTorrentComponent
  ],
  imports: [
    CommonModule,
    EditTorrentRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ]
})
export class EditTorrentModule { }
