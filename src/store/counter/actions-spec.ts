import { expect } from 'chai';
import { INCREASE_COUNTER, ICounterAction, increaseCounter } from './';

describe('counter-actions', function() {
  it('creates an action to increase the counter', function() {
    const expectedAction: ICounterAction = { type: INCREASE_COUNTER, amount: +1 };
    expect(increaseCounter(+1)).to.eql(expectedAction);
  });
});
