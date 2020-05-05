import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseItem } from '../models/course-item';
import { BreadCrumb } from '../../core/breadcrumbs/breadcrumbs.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-course-list-item',
  templateUrl: './edit-course-list-item.component.html',
  styleUrls: ['./edit-course-list-item.component.css']
})
export class EditCourseListItemComponent implements OnInit {
  breadcrumbs: BreadCrumb[];
  course: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.course = this.createFormGroup(this.route.snapshot.data.course);
  }

  createFormGroup(course: CourseItem): FormGroup {
    return this.fb.group({
              id: course.id,
              name: [ course.name, [ Validators.required, Validators.maxLength(50), Validators.minLength(2) ]],
              authors: [ course.authors, Validators.required ],
              date: [ course.date, Validators.required ],
              length: [ course.length, Validators.required ],
              description: [ course.description, [ Validators.required, Validators.maxLength(500)] ]
            });
  }

}
