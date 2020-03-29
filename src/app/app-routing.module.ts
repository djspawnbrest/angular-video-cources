import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { Page404Component } from './shared/page404/page404.component';

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
        loadChildren: () => import('./course-list/course-list.module').then(m => m.CourseListModule)
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
