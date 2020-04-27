import { createEntityAdapter } from '@ngrx/entity';
import { CourseItem } from '../models/course-item';

export const adapter = createEntityAdapter<CourseItem>();

export const {
    selectIds: selectCourseIds,
    selectEntities: selectCourseEntities,
    selectAll: selectAllCourses,
    selectTotal: coursesCount

 } = adapter.getSelectors();
