import { NgModule } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { Page404Component } from './page404/page404.component';
import { ErrorHandlerInterceptor } from './interceptor/error-handler.interceptor';
import { LoadingInterceptor } from './interceptor/loading.interceptor';
import { LoadingService } from './services';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ConfirmDialogComponent,
    Page404Component
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    LoadingService,
    AsyncPipe
  ]
})
export class SharedModule { }
