import { User } from '../models/user';

export interface State {
    isSuccess: boolean;
    loggedIn: boolean;
    user: User | null;
}
