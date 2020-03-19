import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { Page404Component } from './page404/page404.component';


@NgModule({
  declarations: [
    ConfirmDialogComponent,
    Page404Component
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
