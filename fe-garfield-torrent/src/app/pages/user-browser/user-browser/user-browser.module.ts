import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserBrowserRoutingModule } from './user-browser-routing.module';
import { UserBrowserComponent } from './user-browser.component';


@NgModule({
  declarations: [
    UserBrowserComponent
  ],
  imports: [
    CommonModule,
    UserBrowserRoutingModule
  ]
})
export class UserBrowserModule { }
