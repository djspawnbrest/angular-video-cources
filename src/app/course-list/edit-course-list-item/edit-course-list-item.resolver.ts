import { Injectable, Input } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { ICourseItem } from '../models/course-item.model';

import { Store, select } from '@ngrx/store';
import { CourseState } from '../store/course-list.state';
import * as courseListSelector from '../store/course-list.selectors';
import { CourseItem } from '../models/course-item';

@Injectable()
export class EditCourseListItemResolver implements Resolve<any> {
    model: ICourseItem;
    constructor(
        private store: Store<CourseState>,
        private router: Router,
        ) {}
    resolve(route: ActivatedRouteSnapshot) {
        this.store.pipe(
            select(courseListSelector.selectCourse(+route.params.id))
        )
        .subscribe(
            (res: ICourseItem) => {
                if (!res) {
                    this.router.navigate(['**']);
                } else {
                    route.routeConfig.data.breadcrumb = res.name;
                    this.model = new CourseItem(
                        res.id,
                        res.name,
                        res.authors,
                        res.description,
                        res.length,
                        res.date,
                        res.isTopRated
                    );
                }
            }
        );
        return this.model;
    }
}
