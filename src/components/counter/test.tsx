import { expect } from 'chai';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import * as sinon from 'sinon';
import Counter, { CounterProps } from './index';
import { CounterAction } from '../../actions';

describe.only('CounterComponent', function() {
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
    it('triggers the action when increase button is clicked to increase counter by 1', function() {
      TestUtils.Simulate.click(instance.refs.increase);
      expect(props.increaseCounter).to.have.been.calledOnce;
    });
  });

  describe('state', function() {
    it('renders correct value', function() {
      props.counter.value = 100;
      instance.forceUpdate();
      expect(instance.refs.value.innerHTML).to.equal('100');
    });
  });

  it('works???', function () {
    expect(instance).to.be.ok;
  });
});
