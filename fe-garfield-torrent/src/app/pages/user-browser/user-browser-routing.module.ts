import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserBrowserComponent } from './user-browser.component';

const routes: Routes = [{ path: '', component: UserBrowserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserBrowserRoutingModule { }
