import { IName } from './name.model';

export interface IUser {
    id: number;
    token: string;
    name: IName;
    login: string;
    password: string;
}

export interface IAuthenticate {
    login: string;
    password: string;
}
