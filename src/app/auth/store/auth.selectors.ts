import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './auth.state';
import * as authReducers from './auth.reducers';

export const getAuthState =
    createFeatureSelector<State>('auth');

export const getUser = createSelector(
    getAuthState,
    authReducers.getUser
);
export const getLoggedIn = createSelector(
    getAuthState,
    authReducers.getLoggedIn
);
export const getLoginError = createSelector(
    getAuthState,
    authReducers.getErrorMessage
);
