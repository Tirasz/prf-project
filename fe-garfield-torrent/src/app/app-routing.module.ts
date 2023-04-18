import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) }, { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) }, { path: 'create-torrent', loadChildren: () => import('./pages/create-torrent/create-torrent.module').then(m => m.CreateTorrentModule) }, { path: 'browser', loadChildren: () => import('./pages/browser/browser.module').then(m => m.BrowserModule) }, { path: 'torrent', loadChildren: () => import('./pages/torrent/torrent.module').then(m => m.TorrentModule) }, { path: 'edit-torrent', loadChildren: () => import('./pages/edit-torrent/edit-torrent.module').then(m => m.EditTorrentModule) }, { path: 'edit-user', loadChildren: () => import('./pages/edit-user/edit-user.module').then(m => m.EditUserModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
