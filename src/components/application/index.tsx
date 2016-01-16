import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as counterActions from '../../actions/counter';
import Counter from '../counter';

declare const DEVELOPMENT;

const DevTools = DEVELOPMENT && require('../../containers/devtools').default;

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
