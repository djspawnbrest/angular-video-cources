import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { CourseListComponent } from './course-list/course-list.component';
import { AddCourseListItemComponent } from './add-course-list-item/add-course-list-item.component';
import { EditCourseListItemComponent } from './edit-course-list-item/edit-course-list-item.component';
import { EditCourseListItemResolver } from './edit-course-list-item/edit-course-list-item.resolver';

const routes: Routes = [
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

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [EditCourseListItemResolver]
})
export class CourseListRoutingModule { }
