import { Action } from '@ngrx/store';
import { Authenticate, User } from '../models/user';

export enum AuthActionTypes {
  StartAppInit = '[AppInit] Start App Initializer',
  FinishAppInit = '[AppInit] Finish App Initializer',
  Login = '[Auth] Login',
  Logout = '[Auth] Logout',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  CheckIsLogged = '[Auth] Check is Logged',
  CheckIsLoggedRes = '[Auth] Check is Logged Result',
}

export class StartAppInit implements Action {
    readonly type = AuthActionTypes.StartAppInit;
}

export class FinishAppInit implements Action {
    readonly type = AuthActionTypes.FinishAppInit;
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: Authenticate) {}
}

export class Logout implements Action {
    readonly type = AuthActionTypes.Logout;
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: { user: User }) {}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;

  constructor(public payload: any) {}
}

export class CheckIsLogged implements Action {
    readonly type = AuthActionTypes.CheckIsLogged;
}

export class CheckIsLoggedRes implements Action {
    readonly type = AuthActionTypes.CheckIsLoggedRes;

    constructor(public payload: { isLogged: boolean, user: User | null }) {}
}

export type AuthActions =
    StartAppInit
  | FinishAppInit
  | Login
  | LoginSuccess
  | LoginFailure
  | Logout
  | CheckIsLogged
  | CheckIsLoggedRes;