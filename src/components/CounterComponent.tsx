import * as React from 'react';
import { CounterState, CounterAction } from 'store/counter';

export interface CounterProps {
  increaseCounter(amount: number): CounterAction;
  counter: CounterState;
}

export default class CounterComponent extends React.Component<CounterProps, any> {
  render() {
    const { increaseCounter } = this.props;

    return (
      <div>
        value????: <span ref="displayValue">{this.props.counter.value}</span>
        <button ref="increase" onClick={() => increaseCounter(+1) }>increase</button>
        <button ref="decrease" onClick={() => increaseCounter(-1) }>decrease</button>
      </div>
    );
  }
}
