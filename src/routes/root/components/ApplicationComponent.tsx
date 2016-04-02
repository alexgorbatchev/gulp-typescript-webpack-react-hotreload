import * as React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import * as counterActions from '../../../store/counter/CounterActions';
import Counter from '../../../components/CounterComponent';

declare const DEVELOPMENT;

const DevTools = DEVELOPMENT && require('../containers/DevToolsContainer').default;

export default class ApplicationContainer extends React.Component<any, any> {
  render() {
    const { counter, dispatch } = this.props;
    const boundCounterActions = bindActionCreators(counterActions, dispatch);

    return (
      <div>
        <Link to="/blog">blog</Link> |
        <Link to="/about">about</Link>

        <Counter counter={counter} {...boundCounterActions} />

        {this.props.children}
        {DevTools && <DevTools />}
      </div>
    );
  }
}
