import { Injectable, Input } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { CoursesDataService } from '../services/index';
import { Observable } from 'rxjs';
import { ICourseItem } from '../models/course-item.model';

@Injectable()
export class EditCourseListItemResolver implements Resolve<any> {
    @Input() model: Observable<ICourseItem>;
    constructor(
        private courseDataService: CoursesDataService,
        private router: Router
        ) {}
    resolve(route: ActivatedRouteSnapshot) {
        this.model = this.courseDataService.get(+route.params.id);
        this.model.subscribe( (res: ICourseItem) => {
            route.routeConfig.data.breadcrumb = res.name;
        });
        return this.model;
    }
}
