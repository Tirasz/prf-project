import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTorrentComponent } from './create-torrent.component';

const routes: Routes = [{ path: '', component: CreateTorrentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateTorrentRoutingModule { }
