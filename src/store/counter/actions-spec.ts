import { expect } from 'chai';
import { INCREASE_COUNTER, DECREASE_COUNTER, increaseCounter, decreaseCounter } from './';

describe('counter / actions', () => {
  it('increaseCounter', () =>
    expect(increaseCounter()).to.eql({
      type: INCREASE_COUNTER,
      payload: 1,
    })
  );

  it('decreaseCounter', () =>
    expect(decreaseCounter()).to.eql({
      type: DECREASE_COUNTER,
      payload: -1,
    })
  );
});
