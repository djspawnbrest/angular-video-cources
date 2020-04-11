import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { Page404Component } from './page404/page404.component';
import { ErrorHandlerInterceptor } from './interceptor/error-handler.interceptor';
import { LoadingService } from './services';


@NgModule({
  declarations: [
    ConfirmDialogComponent,
    Page404Component
  ],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    LoadingService
  ]
})
export class SharedModule { }
