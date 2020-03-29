import { Injectable, Input } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { CourseItem } from '../models/course-item';
import { CoursesDataService } from '../services/index';

@Injectable({ providedIn: 'root' })
export class EditCourseListItemResolver implements Resolve<any> {
    @Input() model = new CourseItem(0, '', '', '');
    constructor(
        private courseDataService: CoursesDataService,
        private router: Router
        ) {}
    resolve(route: ActivatedRouteSnapshot) {
        if ( this.courseDataService.get(+route.params.id) ) {
            this.model = this.courseDataService.get(+route.params.id);
            route.routeConfig.data.breadcrumb = this.model.title;
            return this.model;
        } else {
            this.router.navigate(['**']);
        }
    }
}
