import { IPayloadAction } from '../interfaces';

export type ICounterState = number;
export interface ICounterAction extends IPayloadAction<ICounterState> { }

export const INCREASE_COUNTER: string = 'INCREASE_COUNTER';
export const DECREASE_COUNTER: string = 'DECREASE_COUNTER';
