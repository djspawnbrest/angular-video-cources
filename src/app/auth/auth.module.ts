import { NgModule, APP_INITIALIZER, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services';

import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { metaReducers } from './store';
import { reducers, IState } from './store/auth.reducers';
import { AuthEffects, OnInitEffects } from './store/auth.effects';
import { StartAppInit, FinishAppInit, CheckIsLogged } from './store/auth.actions';
import { Load } from '../course-list/store/course-list.actions';
import { filter, tap, switchMap } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';

export function initApplication(store: Store<IState>) {
  return () => new Promise(resolve => {
      store.dispatch(new StartAppInit());
      store.dispatch(new CheckIsLogged());
      store.select( (state: any) => state.auth.isSuccess)
      .pipe(
        filter (v => !! v),
        tap( () => store.dispatch(new Load({textFragment: ''})) ),
        switchMap( () => store.select( (state: any) => state.courses.ids.length) ),
        filter (r => !! r)
      )
      .subscribe( () => {
        store.dispatch(new FinishAppInit());
        resolve(true);
      })
  })
}

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([OnInitEffects, AuthEffects]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApplication,
      multi: true,
      deps: [[new Inject(Store)]]
   }
  ]
})
export class AuthModule { }
