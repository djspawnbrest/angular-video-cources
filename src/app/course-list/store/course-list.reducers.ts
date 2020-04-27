import { CoursesActionTypes, CoursesActions } from './course-list.actions';
import { CourseState } from './course-list.state';
import * as courseListAdapter from './course-list.adapter';

const initialState: CourseState = courseListAdapter.adapter.getInitialState();

export function reducer(state = initialState, action: CoursesActions): CourseState {
    switch (action.type) {
        case CoursesActionTypes.AddCourseSuccess: {
            return courseListAdapter.adapter.addOne(action.payload, state);
        }

        case CoursesActionTypes.RemoveCourseSuccess: {
            return courseListAdapter.adapter.removeOne(action.payload, state);
        }

        case CoursesActionTypes.LoadSuccess: {
            return courseListAdapter.adapter.addAll(action.payload.courses, state);
        }

        case CoursesActionTypes.UpdateCourse: {
            return courseListAdapter.adapter.updateOne({ id: action.payload.id, changes: action.payload }, state);
        }

        default:
            return state;
    }
}
