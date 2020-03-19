import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseListComponent } from './course-list/course-list/course-list.component';
import { LoginComponent } from './auth/login/login.component';
import { AddCourseListItemComponent } from './course-list/add-course-list-item/add-course-list-item.component';
import { EditCourseListItemComponent } from './course-list/edit-course-list-item/edit-course-list-item.component';
import { Page404Component } from './shared/page404/page404.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'courses',
        pathMatch: 'full'
    },
    {
        path: 'courses',
        component: CourseListComponent,
        data: {
            breadcrumb: 'Courses'
        },
        // canActivate: [AuthGuard]
    },
    {
        path: 'courses/new',
        component: AddCourseListItemComponent,
        data: {
        breadcrumb: 'Add'
        }
    },
    {
        path: 'courses/:id',
        component: EditCourseListItemComponent,
        data: {
        breadcrumb: 'Edit',
        }
    },
    {
        path: 'login',
        data: {
            breadcrumb: 'Login'
        },
        component: LoginComponent,
    },
    // otherwise redirect to home
    { path: '**', component: Page404Component, data: {breadcrumb: '404'} }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule  { }
