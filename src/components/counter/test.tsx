import { expect } from 'chai';
import * as sinon from 'sinon';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import Counter, { CounterProps } from './index';

describe('CounterComponent', function() {
  let props: CounterProps;
  let instance;

  beforeEach(function() {
    props = {
      counter: { value: 0 },
      increaseCounter: sinon.spy()
    };

    instance = TestUtils.renderIntoDocument(<Counter {...props} />);
  });

  describe('interaction', function() {
    it('triggers the action when increase button is clicked', function() {
      TestUtils.Simulate.click(instance.refs.increase);
      expect(props.increaseCounter).to.have.been.calledWith(+1);
    });

    it('triggers the action when decrease button is clicked', function() {
      TestUtils.Simulate.click(instance.refs.decrease);
      expect(props.increaseCounter).to.have.been.calledWith(-1);
    });
  });

  describe('display', function() {
    it('renders initial value', function() {
      expect(instance.refs.displayValue.innerHTML).to.equal(props.counter.value.toString());
    });

    it('renders new value', function() {
      props.counter.value = 100;
      instance.forceUpdate();
      expect(instance.refs.displayValue.innerHTML).to.equal('100');
    });
  });
});
