import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseListItemComponent } from './course-list-item/course-list-item.component';
import { SearchComponent } from './search/search.component';
import { CreationDateDirective, HourglassDirective } from '../shared/directives';
import { DurationPipe } from '../shared/pipes';
import { CoursesDataService, AuthorsService } from './services';
import { AddCourseListItemComponent } from './add-course-list-item/add-course-list-item.component';
import { AddEditFormComponent, AuthorComponent, DurationComponent, DateComponent } from './shared';
import { EditCourseListItemComponent } from './edit-course-list-item/edit-course-list-item.component';
import { CourseListRoutingModule } from './course-list.routing.module';
import { reducer } from './store/course-list.reducers';
import { CourseListEffects } from './store/course-list.effects';
import { AuthorsEffects } from './store/author.effects';
import { TranslateModule } from '@ngx-translate/core';
import localeEn from '@angular/common/locales/en';
import localeRu from '@angular/common/locales/ru';
import localeBy from '@angular/common/locales/be';


@NgModule({
  providers: [
    CoursesDataService,
    AuthorsService,
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
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule,
    CourseListRoutingModule,
    StoreModule.forFeature('courses', reducer),
    EffectsModule.forFeature([CourseListEffects, AuthorsEffects]),
    TranslateModule
  ],
  exports: [CourseListComponent, AuthorComponent]
})
export class CourseListModule {
  constructor() {
    registerLocaleData(localeEn, 'en');
    registerLocaleData(localeRu, 'ru');
    registerLocaleData(localeBy, 'by');
  }
}
