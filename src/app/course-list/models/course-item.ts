import { ICourseItem } from './course-item.model';
import { Authors } from './authors.model';

export class CourseItem implements ICourseItem {
    length: number;
    date: string;

    constructor(
        public id: number,
        public name: string,
        public authors: Authors[],
        public description: string,
        length?: number,
        date?: string,
        public isTopRated: boolean = false
        ) {
        this.length = length;
        this.date = date;
    }
}
