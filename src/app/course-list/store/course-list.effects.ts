import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, mergeMap, tap } from 'rxjs/operators';
import { CoursesDataService } from '../services';

import {
  Load,
  LoadFail,
  LoadSuccess,
  AddCourse,
  AddCourseSuccess,
  AddCourseFail,
  RemoveCourse,
  RemoveCourseFail,
  RemoveCourseSuccess,
  UpdateCourseFail,
  UpdateCourseSuccess,
  UpdateCourse,
  CoursesActionTypes,
} from './course-list.actions';
import { CourseItem } from '../models/course-item';

@Injectable()
export class CourseListEffects {
  @Effect()
  loadCourses$: Observable<Action> = this.actions$.pipe(
    ofType(CoursesActionTypes.Load),
    map((action: Load) => action.payload.textFragment),
    mergeMap((textParameter: string) => this.coursesDataService.getWithParams(textParameter)),
    map((courses: CourseItem[]) => new LoadSuccess({ courses })),
    catchError(error => of(new LoadFail(error))
    )
  );

  @Effect()
  addCourse$: Observable<Action> = this.actions$.pipe(
    ofType(CoursesActionTypes.AddCourse),
    map((action: AddCourse) => action.payload),
    mergeMap(course =>
        this.coursesDataService.add(course)
        .pipe(
          map(() => new AddCourseSuccess(course)),
          catchError(() => of(new AddCourseFail(course)))
        )
    )
  );
  @Effect()
  updateCourse$: Observable<Action> = this.actions$.pipe(
    ofType(CoursesActionTypes.UpdateCourse),
    map((action: UpdateCourse) => action.payload),
    mergeMap(course =>
        this.coursesDataService.update(course)
        .pipe(
          map(() => new UpdateCourseSuccess(course)),
          catchError(() => of(new UpdateCourseFail()))
        )
    )
  );

  @Effect()
  removeCourse$: Observable<Action> = this.actions$.pipe(
    ofType(CoursesActionTypes.RemoveCourse),
    map((action: RemoveCourse) => action.payload),
    mergeMap(id =>
        this.coursesDataService.remove(id)
        .pipe(
          map(() => new RemoveCourseSuccess(id)),
          catchError(() => of(new RemoveCourseFail(id)))
        )
    )
  );

  @Effect({ dispatch: false })
  addCourseSuccess$ = this.actions$.pipe(
    ofType(CoursesActionTypes.AddCourseSuccess),
    tap(() => this.router.navigate(['courses']))
  );

  @Effect({ dispatch: false })
  updateCourseSuccess$ = this.actions$.pipe(
    ofType(CoursesActionTypes.UpdateCourseSuccess),
    tap(() => this.router.navigate(['courses']))
  );

  constructor(private actions$: Actions, private coursesDataService: CoursesDataService, private router: Router) {}
}
