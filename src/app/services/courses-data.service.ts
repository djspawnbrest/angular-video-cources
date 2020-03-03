import { Injectable } from '@angular/core';
import { ICourseItem } from '../course-list/models/course-item.model';
import { CourseItem } from '../course-list/models/course-item';

@Injectable({
  providedIn: 'root'
})
export class CoursesDataService {
  private courseListsItems: ICourseItem[] = [];
  private fakeDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
  ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
   aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
    eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
    mollit anim id est laborum.`;

  constructor() {
    this.courseListsItems = [
      new CourseItem(1, 'Video Course 1', 'Vasia Pupkin', this.fakeDescription, 90, this.getDateToString('29.07.2019') ),
      new CourseItem(2, 'Video Course 2', 'Aliaksandr Sitnikau', this.fakeDescription, 91, this.getDateToString('20.02.2020') ),
      new CourseItem(3, 'Video Course 3', 'Aliaksandr Sitnikau', this.fakeDescription, 450, this.getDateToString('20.03.2020'), true )
    ];
   }

  getDateToString(stringDate: string) {
    const day = Number(stringDate.split('.')[0]);
    const month = Number(stringDate.split('.')[1]) - 1;
    const year = Number(stringDate.split('.')[2]);
    const timestamp = new Date(year, month, day).getTime().toString();
    return timestamp;
  }

  getAll(): ICourseItem[] {
    return this.courseListsItems;
  }

  get(id: number): ICourseItem {
    return this.courseListsItems.find( (c) => {
        return c.id === id;
    });
  }

  add(course: ICourseItem): boolean {
    if (this.get(course.id)) {
      return false;
    }
    this.courseListsItems.push(course);
    return true;
  }

  update(course: ICourseItem): boolean {
    for (const c of this.courseListsItems) {
      if (c.id === course.id) {
        c.author = course.author;
        c.creationDate = course.creationDate;
        c.description = course.description;
        c.duration = course.duration;
        c.title = course.title;
        c.topRated = course.topRated;
        return true;
      }
    }
    return false;
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
