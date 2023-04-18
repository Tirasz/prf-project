import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TorrentComponent } from './torrent.component';

const routes: Routes = [{ path: '', component: TorrentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TorrentRoutingModule { }
