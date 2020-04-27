import { EntityState } from '@ngrx/entity';
import { Authors } from '../models/authors.model';

export interface AuthorState extends EntityState<Authors> {}
