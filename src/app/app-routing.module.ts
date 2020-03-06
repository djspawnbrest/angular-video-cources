import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseListComponent } from './course-list/course-list/course-list.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
      path: 'courses',
      data: {
          breadcrumb: 'Courses'
      },
      component: CourseListComponent,
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
  { path: '**', redirectTo: 'courses' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule  { }
