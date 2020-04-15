import { NgModule, APP_INITIALIZER, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services';

import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { metaReducers } from './store';
import { reducers, IState } from './store/auth.reducers';
import { AuthEffects, OnInitEffects } from './store/auth.effects';
import { StartAppInit, FinishAppInit, CheckIsLoggedRes, CheckIsLogged } from './store/auth.actions';
import { map } from 'rxjs/operators';

// export function initApplication(store: Store<IState>) {
//   return () => new Promise(resolve => {
//       store.dispatch(new StartAppInit());
//       store.dispatch(new CheckIsLogged());
//       store.select( (state: any) => state).pipe().subscribe( (res) => {
//         store.dispatch(new FinishAppInit());
//         resolve(true);
//       })
//   })
// }

export function initApplication(store: Store<IState>, authService: AuthService) {
  return () => new Promise(resolve => {
      store.dispatch(new StartAppInit());
      // store.dispatch(new CheckIsLoggedRes({isLogged: true, user: null}));
      store.dispatch(new CheckIsLogged());
      authService.getUserInfo().pipe(
        map(res => {
          if(res){
            return store.dispatch(new CheckIsLoggedRes({ isLogged: true, user: res }));
          } else {
            return store.dispatch(new CheckIsLoggedRes({isLogged: false, user: null}));
          };
        })
      ).subscribe( () => {
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
      deps: [[new Inject(Store)], [new Inject(AuthService)]]
   }
  ]
})
export class AuthModule { }
