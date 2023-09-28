import { createReducer, on } from '@ngrx/store';
import { city } from './city.action'

export const initialState = 'Todas';

export const cityReducer = createReducer(
  initialState,
  on(city, (state, {city}) => city),
);