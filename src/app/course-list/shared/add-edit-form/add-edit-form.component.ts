import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICourseItem } from '../../models/course-item.model';
import { CourseState } from '../../store/course-list.state';
import { AddCourse, UpdateCourse } from '../../store/course-list.actions';
import { FormGroup } from '@angular/forms';
import { CourseItem } from '../../models/course-item';

@Component({
  selector: 'app-add-edit-form',
  templateUrl: './add-edit-form.component.html',
  styleUrls: ['./add-edit-form.component.css']
})
export class AddEditFormComponent implements OnInit, OnDestroy {
  @Input() course: FormGroup;
  constructor(
    private store: Store<CourseState>
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    const course: ICourseItem = new CourseItem(
      this.course.value.id,
      this.course.value.name,
      [this.course.value.authors],
      this.course.value.description,
      this.course.value.length,
      this.course.value.date,
      this.course.value.isTopRated
    );
    if (this.course.value.id !== 0 ) {
      this.store.dispatch(new UpdateCourse(course));
    } else {
      this.store.dispatch(new AddCourse(course));
    }
  }

  ngOnDestroy() {
  }

}
