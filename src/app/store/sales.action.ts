import { createAction, props } from '@ngrx/store';

export const sales = createAction(
  '[Sales Component] sales',
  props<{ sales: string }>()
);
