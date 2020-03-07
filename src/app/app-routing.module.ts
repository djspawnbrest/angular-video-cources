import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseListComponent } from './course-list/course-list/course-list.component';
import { LoginComponent } from './auth/login/login.component';
import { AddCourseListItemComponent } from './course-list/add-course-list-item/add-course-list-item.component';
import { EditCourseListItemComponent } from './course-list/edit-course-list-item/edit-course-list-item.component';

const routes: Routes = [
  {
      path: 'courses',
      data: {
          breadcrumb: 'Courses'
      },
      children: [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list'
        },
        {
            path: 'list',
            component: CourseListComponent,
            data: {
                breadcrumb: 'List'
            },
        },
        {
            path: 'add',
            component: AddCourseListItemComponent,
            data: {
                breadcrumb: 'Add'
            }
        },
        {
            path: 'edit/:id',
            component: EditCourseListItemComponent,
            data: {
                breadcrumb: 'Edit',
            }
        }
      ]
      // canActivate: [AuthGuard]
  },
  {
      path: 'login',
      data: {
          breadcrumb: 'Login'
      },
      component: LoginComponent,
  },
  // otherwise redirect to home
  { path: '**', redirectTo: 'courses/list' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule  { }
