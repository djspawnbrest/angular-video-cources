import { EntityState } from '@ngrx/entity';
import { CourseItem } from '../models/course-item';

export interface CourseState extends EntityState<CourseItem> {}
