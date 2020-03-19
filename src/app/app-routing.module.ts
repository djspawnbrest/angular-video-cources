import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseListComponent } from './course-list/course-list/course-list.component';
import { LoginComponent } from './auth/login/login.component';
import { AddCourseListItemComponent } from './course-list/add-course-list-item/add-course-list-item.component';
import { EditCourseListItemComponent } from './course-list/edit-course-list-item/edit-course-list-item.component';
import { Page404Component } from './shared/page404/page404.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'courses',
        pathMatch: 'full'
    },
    {
        path: 'courses',
        data: {
            breadcrumb: 'Courses'
        },
        children: [
            {
                path: '',
                component: CourseListComponent,
                pathMatch: 'full',
                redirectTo: '',
                data: {
                    breadcrumb: 'List'
                }
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
                data: {
                    breadcrumb: 'Edit',
                },
                canActivate: [AuthGuard]
            }
        ]
    },
    {
        path: 'login',
        data: {
            breadcrumb: 'Login'
        },
        component: LoginComponent,
    },
    // otherwise redirect to home
    {
        path: '**',
        component: Page404Component,
        data: {breadcrumb: '404'}
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule  { }
