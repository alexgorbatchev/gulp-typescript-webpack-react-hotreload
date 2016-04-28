import { INCREASE_COUNTER, DECREASE_COUNTER } from './constants';
import { ICounterState } from './state';
import { createAction } from 'redux-actions';

export const increaseCounter = createAction<number, ICounterState>(INCREASE_COUNTER, value => ({ value }));
export const decreaseCounter = createAction<number, ICounterState>(DECREASE_COUNTER, value => ({ value }));
