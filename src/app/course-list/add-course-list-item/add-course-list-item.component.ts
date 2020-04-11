import { Component, OnInit } from '@angular/core';
import { CourseItem } from '../models/course-item';
import { Authors } from '../models/authors.model';

@Component({
  selector: 'app-add-course-list-item',
  templateUrl: './add-course-list-item.component.html',
  styleUrls: ['./add-course-list-item.component.css']
})
export class AddCourseListItemComponent implements OnInit {
  aut = new Authors (0, 'Alex', 'Spawn');
  model: CourseItem = new CourseItem(0, '', [this.aut], '', 0, '');
  constructor() {}

  ngOnInit() {
  }

}
