import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseListItemComponent } from './course-list-item/course-list-item.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreationDateDirective } from '../directives/creation-date.directive';
import { DurationPipe } from '../pipes/duration.pipe';
import { FindPipe } from '../pipes/find.pipe';
import { HourglassDirective } from '../directives/hourglass.directive';

@NgModule({
  providers: [
    FindPipe
  ],
  declarations: [
    CourseListComponent,
    CourseListItemComponent,
    SearchComponent,
    CreationDateDirective,
    DurationPipe,
    HourglassDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ],
  exports: [ CourseListComponent ]
})
export class CourseListModule { }
