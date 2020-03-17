import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesDataService } from '../services';
import { CourseItem } from '../models/course-item';

@Component({
  selector: 'app-edit-course-list-item',
  templateUrl: './edit-course-list-item.component.html',
  styleUrls: ['./edit-course-list-item.component.css']
})
export class EditCourseListItemComponent implements OnInit {
  @Input() model = new CourseItem(0, '', '', '');
  constructor(
    private route: ActivatedRoute,
    private courseDataService: CoursesDataService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.model = this.courseDataService.get(+params.id);
      this.route.routeConfig.data.breadcrumb = this.model.title;
    });
  }

}
