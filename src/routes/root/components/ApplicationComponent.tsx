import * as React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { increaseCounter, decreaseCounter } from '../../../store/counter';
import Counter from '../../../components/CounterComponent';

declare const DEVELOPMENT;

const DevTools = DEVELOPMENT && require('../containers/DevToolsContainer').default;

export default class ApplicationContainer extends React.Component<any, any> {
  render() {
    const { counter, dispatch } = this.props;
    const boundCounterActions = bindActionCreators({ increaseCounter, decreaseCounter }, dispatch);

    return (
      <div>
        <Link to="/blog">blog</Link>
        |
        <Link to="/about">about</Link>

        <Counter counter={counter} {...boundCounterActions} />

        {this.props.children}
        {DevTools && <DevTools />}
      </div>
    );
  }
}
