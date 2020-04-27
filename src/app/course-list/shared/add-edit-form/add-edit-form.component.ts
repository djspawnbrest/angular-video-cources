import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ICourseItem } from '../../models/course-item.model';
import { CourseState } from '../../store/course-list.state';
import { AddCourse, UpdateCourse } from '../../store/course-list.actions';

@Component({
  selector: 'app-add-edit-form',
  templateUrl: './add-edit-form.component.html',
  styleUrls: ['./add-edit-form.component.css']
})
export class AddEditFormComponent implements OnInit, OnDestroy {
  @Input() model: ICourseItem;
  constructor(
    private store: Store<CourseState>,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.model.id !== 0 ) {
      this.store.dispatch(new UpdateCourse(this.model));
    } else {
      this.store.dispatch(new AddCourse(this.model));
    }
  }

  ngOnDestroy() {
  }

}
