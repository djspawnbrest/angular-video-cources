import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CourseItem } from '../models/course-item';
import { faPen, faTrash, faClock, faCalendar, faStar, faHourglass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.css']
})
export class CourseListItemComponent implements OnInit {
  readonly faPen = faPen;
  readonly faTrash = faTrash;
  readonly faClock = faClock;
  readonly faCalendar = faCalendar;
  readonly faStar = faStar;
  readonly faHourglass = faHourglass;
  @Input() courseListItem: CourseItem;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();

  deleteCourse() {
    this.delete.emit(this.courseListItem.id);
  }

  editCourse() {
    this.edit.emit(this.courseListItem.id);
  }

  constructor() { }

  ngOnInit() {
  }

}
