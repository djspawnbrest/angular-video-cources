import {CourseItemInterface} from './course-item.model';

// TODO: generate id and set creationDate in condtructor
export class CourseItem implements CourseItemInterface {
    creationDate: string;
    duration: Number;
    toTime: string;

    constructor(public id: number, public title: string, public author: string, public description: string, duration?: Number, creationDate?: string, toTime?: string) {
        this.creationDate = creationDate;
        this.toTime = this.timeConvert(duration);
    }

    timeConvert(time) {
        let num = time,
        hours = (num / 60),
        rhours = Math.floor(hours),
        minutes = (hours - rhours) * 60,
        rminutes = Math.round(minutes);
        return rhours + " h " + rminutes + " min";
    }
}
