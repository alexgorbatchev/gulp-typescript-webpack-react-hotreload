import { expect } from 'chai';
import { INCREASE_COUNTER, CounterAction } from '../../actions';
import counterReducer from './index';

const action = (amount: number = 0): CounterAction => ({ type: INCREASE_COUNTER, amount });

describe('reducers', function () {
  describe('counter', function () {
    it('returns the initial state', () => expect(counterReducer(undefined, action())).to.eql({ value: 0 }));
    it('handles INCREASE_COUNTER', () => expect(counterReducer({ value: 10 }, action(1))).to.eql({ value: 11 }));
  });
});
