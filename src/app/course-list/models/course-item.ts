import {ICourseItem} from './course-item.model';

// TODO: generate id and set creationDate in condtructor
export class CourseItem implements ICourseItem {
    creationDate: Date;

    constructor(
        public id: number,
        public title: string,
        public author: string,
        public description: string,
        public duration: number,
        creationDate?: Date,
        public topRated: boolean = false
        ) {
        this.creationDate = creationDate;
    }
}
