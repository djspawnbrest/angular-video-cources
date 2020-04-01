import { Authors } from './authors.model';

export interface ICourseItem {
    id: number;
    name: string;
    authors: Authors[];
    date: string;
    length: number;
    description: string;
    isTopRated: boolean;
}
