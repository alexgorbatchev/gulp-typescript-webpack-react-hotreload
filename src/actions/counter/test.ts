import { expect } from 'chai';
import { INCREASE_COUNTER } from '../constants';
import { CounterAction, increaseCounter } from './index';

describe('actions', function() {
  describe('counter', function () {
    it('creates an action to increase the counter', function () {
      const expectedAction: CounterAction = { type: INCREASE_COUNTER, amount: +1 };
      expect(increaseCounter(+1)).to.eql(expectedAction);
    });
  });
});
