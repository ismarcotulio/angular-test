import { createReducer, on } from '@ngrx/store';
import { sales } from './sales.action'

export const initialState = {};

export const salesReducer = createReducer(
  initialState,
  on(sales, (state, {sales}) => sales),
);