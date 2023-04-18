import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditTorrentComponent } from './edit-torrent.component';

const routes: Routes = [{ path: '', component: EditTorrentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditTorrentRoutingModule { }
