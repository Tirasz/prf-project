import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserRoutingModule } from './browser-routing.module';
import { BrowserComponent } from './browser.component';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    BrowserComponent
  ],
  imports: [
    CommonModule,
    BrowserRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ]
})
export class BrowserModule { }
