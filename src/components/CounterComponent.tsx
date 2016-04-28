import * as React from 'react';
import { ICounterState } from '../store/counter';

export interface CounterProps {
  increaseCounter(amount: number);
  decreaseCounter(amount: number);
  counter: ICounterState;
}

export default class CounterComponent extends React.Component<CounterProps, any> {
  render() {
    const { increaseCounter, decreaseCounter } = this.props;

    return (
      <div>
        value????: <span ref="displayValue">{this.props.counter.value}</span>
        <button ref="increase" onClick={() => increaseCounter(+1) }>increase</button>
        <button ref="decrease" onClick={() => decreaseCounter(1) }>decrease</button>
      </div>
    );
  }
}
