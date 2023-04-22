import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserBrowserRoutingModule } from './user-browser-routing.module';
import { UserBrowserComponent } from './user-browser.component';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    UserBrowserComponent
  ],
  imports: [
    CommonModule,
    UserBrowserRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ]
})
export class UserBrowserModule { }
