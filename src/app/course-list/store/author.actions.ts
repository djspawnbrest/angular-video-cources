import { Action } from '@ngrx/store';
import { Authors } from '../models/authors.model';

export enum AuthorActionTypes {
  Load = '[Authors] Load',
  LoadSuccess = '[Authors] Load Success',
  LoadFail = '[Authors] Load Fail',
}

/**
 * Load Authors Actions
 */
export class Load implements Action {
  readonly type = AuthorActionTypes.Load;

  constructor(public payload: { textFragment: string} ) {}

}
export class LoadSuccess implements Action {
  readonly type = AuthorActionTypes.LoadSuccess;

  constructor(public payload: {authors: Authors[]}) {}
}

export class LoadFail implements Action {
  readonly type = AuthorActionTypes.LoadFail;

  constructor(public payload: any) {}
}

export type AuthorsActions =
  | Load
  | LoadSuccess
  | LoadFail;