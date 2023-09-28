import { createAction, props } from '@ngrx/store';

export const city = createAction(
  '[City Component] filter',
  props<{ city: string }>()
);
