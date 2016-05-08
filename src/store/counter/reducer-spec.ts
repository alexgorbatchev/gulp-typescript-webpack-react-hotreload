import { expect } from 'chai';
import { counterReducer, increaseCounter, decreaseCounter } from './';

describe('counter / reducer', () => {
  it('sets the initial state', () => expect(counterReducer(undefined, increaseCounter())).to.eql(1));
  it('handles INCREASE_COUNTER', () => expect(counterReducer(10, increaseCounter())).to.eql(11));
  it('handles DECREASE_COUNTER', () => expect(counterReducer(10, decreaseCounter())).to.eql(9));
});
