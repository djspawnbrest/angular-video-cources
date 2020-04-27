import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseListItemComponent } from './course-list-item/course-list-item.component';
import { SearchComponent } from './search/search.component';
import { CreationDateDirective, HourglassDirective } from '../shared/directives';
import { DurationPipe } from '../shared/pipes';
import { CoursesDataService } from './services';
import { AddCourseListItemComponent } from './add-course-list-item/add-course-list-item.component';
import { AddEditFormComponent, AuthorComponent, DurationComponent, DateComponent } from './shared';
import { EditCourseListItemComponent } from './edit-course-list-item/edit-course-list-item.component';
import { CourseListRoutingModule } from './course-list.routing.module';
import { reducer } from './store/course-list.reducers';
import { CourseListEffects } from './store/course-list.effects';


@NgModule({
  providers: [
    CoursesDataService,
    DatePipe
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
    RouterModule,
    CourseListRoutingModule,
    StoreModule.forFeature('courses', reducer),
    EffectsModule.forFeature([CourseListEffects])
  ]
})
export class CourseListModule { }
