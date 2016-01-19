import { INCREASE_COUNTER } from './constants';

export interface CounterAction {
  type: string;
  amount: number;
};

export function increaseCounter(amount: number): CounterAction {
  return { type: INCREASE_COUNTER, amount };
};
