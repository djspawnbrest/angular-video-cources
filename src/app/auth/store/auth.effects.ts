import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType, EffectNotification, OnRunEffects } from '@ngrx/effects';
import { tap, map, exhaustMap, catchError, takeUntil, switchMap, mergeMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { AuthService } from '../services';
import {
  Login,
  LoginSuccess,
  LoginFailure,
  CheckIsLoggedRes,
  AuthActionTypes,
} from './auth.actions';
import { Authenticate } from '../models/user';

@Injectable()
export class OnInitEffects implements OnRunEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  @Effect()
  checkIsLogged$ = this.actions$.pipe(
    ofType(AuthActionTypes.CheckIsLogged),
    mergeMap(_ => this.authService.getUserInfo().pipe(map(user => user))),
    map( res => {
      let logged = false;
      if (res !== null) {
        logged =true
      };
      return new CheckIsLoggedRes({isLogged: logged, user: res});
    })
  );

  ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>): Observable<EffectNotification> {
    return this.actions$.pipe(
      ofType(AuthActionTypes.StartAppInit),
      exhaustMap( () => resolvedEffects$.pipe(
        takeUntil( this.actions$.pipe( ofType(AuthActionTypes.FinishAppInit)))
      ))
    );
  }
}

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    map((action: Login) => action.payload),
    exhaustMap((auth: Authenticate) =>
    this.authService
      .login(auth)
      .pipe(
        switchMap(_ => this.authService.getUserInfo().pipe(map(user => user))),
        map(data => new LoginSuccess({ user: data })),
        catchError(error => of(new LoginFailure(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    tap(() => this.router.navigate(['/']))
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    tap( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    })
  );
}
