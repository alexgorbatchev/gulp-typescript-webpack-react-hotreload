import { expect } from 'chai';
import { ICounterAction } from './CounterActions';
import { INCREASE_COUNTER } from './constants';
import counterReducer from './CounterReducer';

const action = (amount: number = 0): ICounterAction => ({ type: INCREASE_COUNTER, amount });

describe('counterReducer', function() {
  it('returns the initial state', () => expect(counterReducer(undefined, action())).to.eql({ value: 0 }));
  it('handles INCREASE_COUNTER', () => expect(counterReducer({ value: 10 }, action(1))).to.eql({ value: 11 }));
});
