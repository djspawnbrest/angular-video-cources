import { ActionReducer, MetaReducer } from '@ngrx/store';
import { IState } from './auth.reducers';

export function logger(reducer: ActionReducer<IState>): ActionReducer<IState> {
    return (state: IState, action: any): IState => {
        console.log('state', state, '\naction', action);
        return reducer(state, action);
    };
};

export const metaReducers: MetaReducer<IState>[] = [logger];
