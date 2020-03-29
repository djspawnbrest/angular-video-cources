import { Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { CourseListComponent } from './course-list/course-list.component';
import { AddCourseListItemComponent } from './add-course-list-item/add-course-list-item.component';
import { EditCourseListItemComponent } from './edit-course-list-item/edit-course-list-item.component';
import { EditCourseListItemResolver } from './edit-course-list-item/edit-course-list-item.resolver';

export const courseRoutes: Routes = [
    {
        path: '',
        component: CourseListComponent,
        pathMatch: 'full',
        redirectTo: '',
        data: {
            breadcrumb: 'List'
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'new',
        component: AddCourseListItemComponent,
        data: {
        breadcrumb: 'Add'
        },
        canActivate: [AuthGuard]
    },
    {
        path: ':id',
        component: EditCourseListItemComponent,
        resolve: {course: EditCourseListItemResolver},
        data: {
            breadcrumb: 'Edit',
        },
        canActivate: [AuthGuard]
    }
];


