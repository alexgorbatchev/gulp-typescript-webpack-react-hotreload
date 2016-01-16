import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CounterState } from '../../models/counter';
import { CounterAction } from '../../actions/counter';

interface CounterProps {
  increaseCounter(amount: number): CounterAction;
  counter: CounterState;
}

export default class CounterComponent extends React.Component<CounterProps, any> {
  render() {
    const { increaseCounter } = this.props;

    return (
      <div>
        value: {this.props.counter.value}
        <button onClick={() => increaseCounter(+1)}>increase</button>
        <button onClick={() => increaseCounter(-1)}>decrease</button>
      </div>
    );
  }
}
