import {CourseItemInterface} from './course-item.model';

// TODO: generate id and set creationDate in condtructor
export class CourseItem implements CourseItemInterface {
    creationDate: string;
    duration: number;
    toTime: string;

    constructor(
        public id: number,
        public title: string,
        public author: string,
        public description: string,
        duration?: number,
        creationDate?: string,
        toTime?: string
        ) {
        this.creationDate = creationDate;
        this.toTime = this.timeConvert(duration);
    }

    timeConvert(time: number) {
        const num = time;
        const hours = (num / 60);
        const rhours = Math.floor(hours);
        const minutes = (hours - rhours) * 60;
        const rminutes = Math.round(minutes);
        if (rhours <= 0) {
            return `${rminutes} min`;
        } else {
            return `${rhours} h ${rminutes} min`;
        }
    }
}
