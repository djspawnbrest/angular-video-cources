import { Component, OnInit } from '@angular/core';
import { CourseItem } from '../models/course-item';

@Component({
  selector: 'app-add-course-list-item',
  templateUrl: './add-course-list-item.component.html',
  styleUrls: ['./add-course-list-item.component.css']
})
export class AddCourseListItemComponent implements OnInit {
  model = new CourseItem(0, '', '', '');
  constructor() {}

  ngOnInit() {
  }

}
