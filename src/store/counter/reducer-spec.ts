import { expect } from 'chai';
import { counterReducer, increaseCounter, decreaseCounter } from './';

describe.only('counter-reducer', () => {
  it('sets the initial state', () => expect(counterReducer(undefined, increaseCounter(1))).to.eql({ value: 1 }));
  it('handles INCREASE_COUNTER', () => expect(counterReducer({ value: 10 }, increaseCounter(1))).to.eql({ value: 11 }));
  it('handles DECREASE_COUNTER', () => expect(counterReducer({ value: 10 }, decreaseCounter(1))).to.eql({ value: 9 }));
});
