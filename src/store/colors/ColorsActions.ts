import { REQUEST_COLORS, RECEIVE_COLORS } from './constants';

export interface Color {
  color: string;
  value: string;
}

export interface CounterAction {
  type: string;
  colors: Array<Color>;
}

// export function increaseCounter(amount: number): CounterAction {
//   return { type: INCREASE_COUNTER, amount };
// };
