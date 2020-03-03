import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CourseItem } from '../models/course-item';
import { FindPipe } from '../../pipes/find.pipe';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  readonly faPlus = faPlus;
  courseListsItems: CourseItem [];
  allCourseListsItems: CourseItem[];
  fakeDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
  ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
   aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
    eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
    mollit anim id est laborum.`;

  constructor(private findPipe: FindPipe) {
    this.courseListsItems = [];
    this.allCourseListsItems = [];
  }

  onFind(findValue: string) {
    this.courseListsItems = this.findPipe.transform(this.allCourseListsItems, findValue);
  }

  onAddCourse() {
    console.log('Add new course event');
  }

  onDelete(id: number) {
    console.log('Delete course:' + id);
  }

  onEdit(id: number) {
    console.log('Edit course:' + id);
  }

  loadMoreCourses() {
    console.log('Load more courses');
  }

  trackByFn(index, item) {
    return item.id;
  }

  ngOnInit() {
    this.courseListsItems = this.allCourseListsItems = [
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

}
