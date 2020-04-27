import { AuthActions, AuthActionTypes } from './auth.actions';
import { ActionReducerMap } from '@ngrx/store';
import { State } from './auth.state';
import { CourseState } from 'src/app/course-list/store/course-list.state';
import { AuthorState } from 'src/app/course-list/store/author.state';
import * as coursesReducers from '../../course-list/store/course-list.reducers';
import * as authorsReducers from '../../course-list/store/author.reducers';

export const initialState: State = {
  isSuccess: false,
  loggedIn: false,
  user: null,
  errorMessage: null
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.CheckIsLoggedRes: {
        return {
            ...state,
            isSuccess: true,
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

    case AuthActionTypes.LoginFailure: {
      return {
        ...state,
        errorMessage: action.payload.error
      };
    }

    default: {
      return state;
    }
  }
};

export interface IState {
    auth: State;
    courses: CourseState;
    authors: AuthorState;
};

export const reducers: ActionReducerMap<IState> = {
    auth: reducer,
    courses: coursesReducers.reducer,
    authors: authorsReducers.reducer
};

export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => {
  if(state.user) {
    return `${state.user.name.firstName} ${state.user.name.lastName}`;
  } else {
    return '';
  }
};
export const getErrorMessage = (state: State) => state.errorMessage;
