import { createEntityAdapter } from '@ngrx/entity';
import { Authors } from '../models/authors.model';

export const adapter = createEntityAdapter<Authors>();

export const {
    selectIds: selectAuthorIds,
    selectEntities: selectAuthorEntities,
    selectAll: selectAllAuthors,
    selectTotal: authorsCount

 } = adapter.getSelectors();
