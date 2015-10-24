const Radium = require('radium');

import * as React from 'react';

enum Kinds {
  primary,
  warning
}

interface HelloWorldProps extends React.Props<any> {
  name: string;
  kind: Kinds;
}

var styles = {
  base: {
    color: '#fff'
  },

  [Kinds.primary]: {
    background: '#0074D9'
  },

  [Kinds.warning]: {
    background: '#FF4136'
  }
};

// @Radium
export default class App extends React.Component<HelloWorldProps, any> {
  static propTypes: React.ValidationMap<any> = {
    kind: React.PropTypes.oneOf([Kinds.primary, Kinds.warning]).isRequired
  };

  render() {
    return (
      <div style={[
        styles.base,
        styles[this.props.kind]
      ]}>
        <h1>Hello, {this.props.name}...</h1>
        <div src="[[ ./images/twitter.svg ]]" />
        </div>
    );
  }
}

module.exports = App;