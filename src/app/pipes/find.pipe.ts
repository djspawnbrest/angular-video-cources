import { Pipe, PipeTransform } from '@angular/core';
import { CourseItemInterface } from '../course-list/models/course-item.model';

@Pipe({
  name: 'find'
})
export class FindPipe implements PipeTransform {

  transform(courses: CourseItemInterface[], findValue: string): CourseItemInterface[] {
    return courses.filter( (course) => {
      if (
        course.author.toLowerCase().indexOf(findValue.toLowerCase()) > -1 ||
        course.title.toLowerCase().indexOf(findValue.toLowerCase()) > -1 ||
        course.description.toLowerCase().indexOf(findValue.toLowerCase()) > -1
        ) {
        return course;
      }
    });
  }
}
