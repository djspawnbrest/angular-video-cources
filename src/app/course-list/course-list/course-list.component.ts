import { Component, OnInit } from '@angular/core';
import { CourseItem } from '../models/course-item';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courseListsItems: CourseItem [];
  // tslint:disable-next-line:max-line-length
  fakeDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'; 

  constructor() {
    this.courseListsItems = [];
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

  ngOnInit() {
    this.courseListsItems = [
      new CourseItem(1, 'Video Course 1', 'Aliaxandr Sitnikau', this.fakeDescription, 28, '08.29.2019'),
      new CourseItem(2, 'Video Course 2', 'Aliaxandr Sitnikau', this.fakeDescription, 30, '01.01.2020'),
      new CourseItem(3, 'Video Course 3', 'Aliaxandr Sitnikau', this.fakeDescription, 450, '02.23.2020')
    ];
  }

}
