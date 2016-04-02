import { expect } from 'chai';
import { INCREASE_COUNTER, CounterAction, increaseCounter } from './';

describe('CounterAction', function() {
  it('creates an action to increase the counter', function () {
    const expectedAction: CounterAction = { type: INCREASE_COUNTER, amount: +1 };
    expect(increaseCounter(+1)).to.eql(expectedAction);
  });
});
