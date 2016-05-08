import { INCREASE_COUNTER, DECREASE_COUNTER, ICounterState, ICounterAction } from './types';

const initialState: ICounterState = 0;

function updateCounter(state: ICounterState, action: ICounterAction): ICounterState {
  return state + action.payload;
}

export function counterReducer(state: ICounterState = initialState, action: ICounterAction): ICounterState {
  switch (action.type) {
    case INCREASE_COUNTER: return updateCounter(state, action);
    case DECREASE_COUNTER: return updateCounter(state, action);
  }

  return state;
}
