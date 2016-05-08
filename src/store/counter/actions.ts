import { INCREASE_COUNTER, DECREASE_COUNTER, ICounterAction } from './types';

export function increaseCounter(): ICounterAction {
  return {
    type: INCREASE_COUNTER,
    payload: 1,
  };
}

export function decreaseCounter(): ICounterAction {
  return {
    type: DECREASE_COUNTER,
    payload: -1,
  };
}
