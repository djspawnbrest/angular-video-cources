import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseItem } from '../models/course-item';
import { CoursesDataService } from '../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-course-list-item',
  templateUrl: './create-course-list-item.component.html',
  styleUrls: ['./create-course-list-item.component.css']
})
export class CreateCourseListItemComponent implements OnInit {
  model = new CourseItem(0, '', '', '');
  constructor(private courseDataService: CoursesDataService, private router: Router) {}

  ngOnInit() {
  }

  onSubmit() {
    this.courseDataService.add(this.model);
    this.router.navigate(['courses/list']);
  }

}
