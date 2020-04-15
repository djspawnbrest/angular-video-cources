import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from './course-list.state';
import * as courseListAdapter from './course-list.adapter';

export const getCourseState = createFeatureSelector<CourseState>('courses');

export const selectCourseIds = createSelector(getCourseState, courseListAdapter.selectCourseIds);

export const selectCourseEntities = createSelector(getCourseState, courseListAdapter.selectCourseEntities);

export const selectCourse = (id: number) => createSelector(
    selectCourseEntities,
    courses => courses[id]
);

export const selectAllCourses = createSelector(getCourseState, courseListAdapter.selectAllCourses);

export const coursesCount = createSelector(getCourseState, courseListAdapter.coursesCount);
