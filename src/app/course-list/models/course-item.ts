import {ICourseItem} from './course-item.model';

// TODO: generate id and set creationDate in condtructor
export class CourseItem implements ICourseItem {
    duration: number;
    creationDate: string;

    constructor(
        public id: number,
        public title: string,
        public author: string,
        public description: string,
        duration?: number,
        creationDate?: string,
        public topRated: boolean = false
        ) {
        this.duration = duration;
        this.creationDate = creationDate;
    }
}
