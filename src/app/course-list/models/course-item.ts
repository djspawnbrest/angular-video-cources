import {CourseItemInterface} from './course-item.model';

// TODO: generate id and set creationDate in condtructor
export class CourseItem implements CourseItemInterface {
    id: number;
    title: string;
    author: string;
    creationDate: string;
    duration: Number;
    description: string;
    toTime: string;

    constructor(id: number, title: string, author: string, description: string, duration?: Number, creationDate?: string) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.duration = duration;
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
