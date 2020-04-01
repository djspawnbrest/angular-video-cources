import { IName } from './name.model';

export class Name implements IName {
    firstName: string;
    lastName: string;

    constructor(first: string, last: string) {
        this.firstName = first;
        this.lastName = last;
    }
}
