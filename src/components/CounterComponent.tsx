import * as React from 'react';
import { ICounterState } from '../store/counter';

export interface CounterProps {
  increaseCounter();
  decreaseCounter();
  counter: ICounterState;
}

export default class CounterComponent extends React.Component<CounterProps, any> {
  render() {
    const { increaseCounter, decreaseCounter } = this.props;

    return (
      <div>
        value????: <span ref="displayValue">{this.props.counter}</span>
        <button ref="increase" onClick={() => increaseCounter() }>increase</button>
        <button ref="decrease" onClick={() => decreaseCounter() }>decrease</button>
      </div>
    );
  }
}
