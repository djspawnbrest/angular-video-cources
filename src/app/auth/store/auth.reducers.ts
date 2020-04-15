import { AuthActions, AuthActionTypes } from './auth.actions';
import { ActionReducerMap } from '@ngrx/store';
import { State } from './auth.state';

export const initialState: State = {
  loggedIn: false,
  user: null,
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.CheckIsLoggedRes: {
        return {
            ...state,
            loggedIn: action.payload.isLogged,
            user: action.payload.user
        }
    }

    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user
      };
    }

    case AuthActionTypes.Logout: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export interface IState {
    auth: State;
};

export const reducers: ActionReducerMap<IState> = {
    auth: reducer
};

export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => {
  if(state.user) {
    return `${state.user.name.firstName} ${state.user.name.lastName}`;
  } else {
    return '';
  }
};
