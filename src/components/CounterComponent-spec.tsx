import { expect } from 'chai';
import * as sinon from 'sinon';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import CounterComponent, { CounterProps } from './CounterComponent';

describe('CounterComponent', () => {
  let props: CounterProps;
  let instance;

  beforeEach(() => {
    props = {
      counter: 0,
      increaseCounter: sinon.spy(),
      decreaseCounter: sinon.spy(),
    };

    instance = TestUtils.renderIntoDocument(<CounterComponent {...props} />);
  });

  describe('interaction', () => {
    it('triggers the action when increase button is clicked', () => {
      TestUtils.Simulate.click(instance.refs.increase);
      expect(props.increaseCounter).to.have.been.calledWith(+1);
    });

    it('triggers the action when decrease button is clicked', () => {
      TestUtils.Simulate.click(instance.refs.decrease);
      expect(props.decreaseCounter).to.have.been.calledWith(1);
    });
  });

  describe('display', () => {
    it('renders initial value', () => {
      expect(instance.refs.displayValue.innerHTML).to.equal(props.counter.toString());
    });

    it('renders new value', () => {
      props.counter = 100;
      instance.forceUpdate();
      expect(instance.refs.displayValue.innerHTML).to.equal('100');
    });
  });
});
