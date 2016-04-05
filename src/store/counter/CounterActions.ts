import { INCREASE_COUNTER } from './constants';
import { IAction } from '../interfaces';

export interface ICounterAction extends IAction {
  amount: number;
};

export function increaseCounter(amount: number): ICounterAction {
  return { type: INCREASE_COUNTER, amount };
};
