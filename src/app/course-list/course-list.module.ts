import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseListItemComponent } from './course-list-item/course-list-item.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreationDateDirective, HourglassDirective } from '../shared/directives';
import { DurationPipe, FindPipe } from '../shared/pipes';
import { CoursesDataService, EventService } from './services';
import { AddCourseListItemComponent } from './add-course-list-item/add-course-list-item.component';
import { RouterModule } from '@angular/router';
import { AddEditFormComponent, AuthorComponent, DurationComponent, DateComponent } from './shared';
import { EditCourseListItemComponent } from './edit-course-list-item/edit-course-list-item.component';

@NgModule({
  providers: [
    FindPipe,
    CoursesDataService,
    EventService
  ],
  declarations: [
    CourseListComponent,
    CourseListItemComponent,
    SearchComponent,
    CreationDateDirective,
    DurationPipe,
    HourglassDirective,
    AddCourseListItemComponent,
    AddEditFormComponent,
    DateComponent,
    AuthorComponent,
    DurationComponent,
    EditCourseListItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule
  ]
})
export class CourseListModule { }
