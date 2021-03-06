import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CourseItem } from '../models/course-item';
import { faPen, faTrash, faClock, faCalendar, faStar, faHourglass } from '@fortawesome/free-solid-svg-icons';
import { ICourseItem } from '../models/course-item.model';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseListItemComponent implements OnInit {
  readonly faPen = faPen;
  readonly faTrash = faTrash;
  readonly faClock = faClock;
  readonly faCalendar = faCalendar;
  readonly faStar = faStar;
  readonly faHourglass = faHourglass;
  @Input() courseListItem: CourseItem;
  @Output() delete = new EventEmitter<ICourseItem>();
  @Output() edit = new EventEmitter<number>();
  authors: string;

  deleteCourse() {
    this.delete.emit(this.courseListItem);
  }

  constructor() { }

  ngOnInit() {
    this.authors = this.courseListItem.authors.map((v) => `${v.name} ${v.lastName}`).join(', ');
  }

}
