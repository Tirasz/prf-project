import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTorrentRoutingModule } from './create-torrent-routing.module';
import { CreateTorrentComponent } from './create-torrent.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select'

@NgModule({
  declarations: [
    CreateTorrentComponent
  ],
  imports: [
    CommonModule,
    CreateTorrentRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ]
})
export class CreateTorrentModule { }
