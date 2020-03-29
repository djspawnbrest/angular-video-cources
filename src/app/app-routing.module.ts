import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { Page404Component } from './shared/page404/page404.component';
import { courseRoutes } from './course-list/course.routes';
import { EditCourseListItemResolver } from './course-list/edit-course-list-item/edit-course-list-item.resolver';

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
            ...courseRoutes
        ]
    },
    {
        path: 'login',
        data: {
            breadcrumb: 'Login'
        },
        component: LoginComponent
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
