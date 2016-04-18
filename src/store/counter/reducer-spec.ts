import { expect } from 'chai';
import { ICounterAction, INCREASE_COUNTER, counterReducer } from './';

const action = (amount: number = 0): ICounterAction => ({ type: INCREASE_COUNTER, amount });

describe('counter-reducer', function() {
  it('returns the initial state', () => expect(counterReducer(undefined, action())).to.eql({ value: 0 }));
  it('handles INCREASE_COUNTER', () => expect(counterReducer({ value: 10 }, action(1))).to.eql({ value: 11 }));
});
