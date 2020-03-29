import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseItem } from '../models/course-item';
import { BreadCrumb } from '../../core/breadcrumbs/breadcrumbs.model';

@Component({
  selector: 'app-edit-course-list-item',
  templateUrl: './edit-course-list-item.component.html',
  styleUrls: ['./edit-course-list-item.component.css']
})
export class EditCourseListItemComponent implements OnInit {
  breadcrumbs: BreadCrumb[];
  @Input() model = new CourseItem(0, '', '', '');
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.model = this.route.snapshot.data.course;
  }

}
