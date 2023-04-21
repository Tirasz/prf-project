import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth-guard.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'create-torrent',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/create-torrent/create-torrent.module').then(m => m.CreateTorrentModule)
  },
  {
    path: 'browser',
    loadChildren: () => import('./pages/browser/browser.module').then(m => m.BrowserModule)
  },
  {
    path: 'torrent',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/torrent/torrent.module').then(m => m.TorrentModule)
  },
  {
    path: 'edit-torrent',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/edit-torrent/edit-torrent.module').then(m => m.EditTorrentModule)
  },
  {
    path: 'edit-user',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/edit-user/edit-user.module').then(m => m.EditUserModule)
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
