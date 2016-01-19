import { expect } from 'chai';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';
import * as sinon from 'sinon';
import Counter, { CounterProps } from './index';
import { CounterState } from '../../models';
import { CounterAction, increaseCounter } from '../../actions';

describe.only('CounterComponent', function() {
  let instance;
  let increaseCounterSpy;

  beforeEach(function() {
    const props: CounterProps = {
      counter: { value: 0 },
      increaseCounter(amount: number): CounterAction {
        increaseCounterSpy(amount);
        return { type: '', amount: 0 };
      }
    };

    increaseCounterSpy = sinon.spy();

    instance = TestUtils.renderIntoDocument(
      <Counter {...props} />
    );
  })

  describe('interaction', function() {
    it('triggers the action when increase button is clicked to increase counter by 1', function() {
      TestUtils.Simulate.click(instance.refs.increase);
      expect(increaseCounterSpy).to.have.been.calledOnce;
    });
  });

  it('works???', function () {
    expect(instance).to.be.ok;
  });
});