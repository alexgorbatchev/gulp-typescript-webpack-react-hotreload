import { expect } from 'chai';
import { INCREASE_COUNTER, DECREASE_COUNTER, increaseCounter, decreaseCounter } from './';

describe('counter-actions', () => {
  it('increaseCounter', () =>
    expect(increaseCounter(1)).to.eql({
      type: INCREASE_COUNTER,
      payload: { value: 1 }
    })
  );

  it('decreaseCounter', () =>
    expect(decreaseCounter(1)).to.eql({
      type: DECREASE_COUNTER,
      payload: { value: 1 }
    })
  );
});
