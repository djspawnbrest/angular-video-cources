import { Action } from '@ngrx/store';
import { CourseItem } from '../models/course-item';

export enum CoursesActionTypes {
  AddCourse = '[Courses] Add Course',
  AddCourseSuccess = '[Courses] Add Course Success',
  AddCourseFail = '[Courses] Add Course Fail',
  RemoveCourse = '[Courses] Remove Course',
  RemoveCourseSuccess = '[Courses] Remove Course Success',
  RemoveCourseFail = '[Courses] Remove Course Fail',
  UpdateCourse = '[Courses] Update Course',
  UpdateCourseSuccess = '[Courses] Update Course Success',
  UpdateCourseFail = '[Courses] Update Course Fail',
  Load = '[Courses] Load',
  LoadSuccess = '[Courses] Load Success',
  LoadFail = '[Courses] Load Fail',
}

/**
 * Add Course to Courses Actions
 */
export class AddCourse implements Action {
  readonly type = CoursesActionTypes.AddCourse;

  constructor(public payload: CourseItem) {}
}

export class AddCourseSuccess implements Action {
  readonly type = CoursesActionTypes.AddCourseSuccess;

  constructor(public payload: CourseItem) {}
}

export class AddCourseFail implements Action {
  readonly type = CoursesActionTypes.AddCourseFail;

  constructor(public payload: CourseItem) {}
}

/**
 * Remove Course from Courses Actions
 */
export class RemoveCourse implements Action {
  readonly type = CoursesActionTypes.RemoveCourse;

  constructor(public payload: number) {}
}

export class RemoveCourseSuccess implements Action {
  readonly type = CoursesActionTypes.RemoveCourseSuccess;

  constructor(public payload: number) {}
}

export class RemoveCourseFail implements Action {
  readonly type = CoursesActionTypes.RemoveCourseFail;

  constructor(public payload: number) {}
}

/**
 * Update Course from Courses Actions
 */
export class UpdateCourse implements Action {
  readonly type = CoursesActionTypes.UpdateCourse;

  constructor(public payload: CourseItem) {}
}

export class UpdateCourseSuccess implements Action {
  readonly type = CoursesActionTypes.UpdateCourseSuccess;

  constructor(public payload: CourseItem) {}
}

export class UpdateCourseFail implements Action {
  readonly type = CoursesActionTypes.UpdateCourseFail;
}

/**
 * Load Courses Actions
 */
export class Load implements Action {
  readonly type = CoursesActionTypes.Load;

  constructor(public payload: { textFragment: string} ) {}

}
export class LoadSuccess implements Action {
  readonly type = CoursesActionTypes.LoadSuccess;

  constructor(public payload: {courses: CourseItem[]}) {}
}

export class LoadFail implements Action {
  readonly type = CoursesActionTypes.LoadFail;

  constructor(public payload: any) {}
}

export type CoursesActions =
  | AddCourse
  | AddCourseSuccess
  | AddCourseFail
  | RemoveCourse
  | RemoveCourseSuccess
  | RemoveCourseFail
  | UpdateCourse
  | UpdateCourseSuccess
  | UpdateCourseFail
  | Load
  | LoadSuccess
  | LoadFail;
