import { Injectable } from '@angular/core';
import { ICourseItem } from './../models/course-item.model';
import { CourseItem } from './../models/course-item';

@Injectable()
export class CoursesDataService {
  private courseListsItems: ICourseItem[] = [];
  private fakeDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
  ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
   aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
    eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
    mollit anim id est laborum.`;

  constructor() {
    this.courseListsItems = [
      new CourseItem(1, 'Video Course 1', 'Vasia Pupkin', this.fakeDescription, 90, '2019-07-29' ),
      new CourseItem(2, 'Video Course 2', 'Aliaksandr Sitnikau', this.fakeDescription, 91, '2020-02-20' ),
      new CourseItem(3, 'Video Course 3', 'Aliaksandr Sitnikau', this.fakeDescription, 450, '2020-03-20', true )
    ];
   }

  getAll(): ICourseItem[] {
    return this.courseListsItems;
  }

  get(id: number): ICourseItem {
    return this.courseListsItems.find( (c) => {
        return c.id === id;
    });
  }

  add(course: ICourseItem) {
    const lastId = Math.max.apply(Math, this.courseListsItems.map((i) => i.id)) + 1;
    course.id = lastId;
    this.courseListsItems.push(course);
  }

  update(course: ICourseItem): ICourseItem {
    return this.courseListsItems.find( (c) => {
      return c === course;
    });
  }

  remove(id: number): boolean {
    if (this.get(id)) {
      this.courseListsItems = this.courseListsItems.filter( (c) => {
        return c.id !== id;
      });
      return true;
    }
    return false;
  }

}
