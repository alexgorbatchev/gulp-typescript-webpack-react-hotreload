/// <reference path="../typings/tsd.d.ts" />

import * as Radium from 'radium';
import * as React from 'react';

export enum ComponentKind {
  primary,
  warning
}

export interface HelloWorldProps extends React.Props<any> {
  name: string;
  kind: ComponentKind;
}

var styles = {
  base: {
    color: '#fff',
  },

  [ComponentKind.primary]: {
    background: '#0074D9',
  },

  [ComponentKind.warning]: {
    background: '#FF4136',
  }
};

export function foo() {
  throw new Error("sad face");
}

@Radium
export default class Component extends React.Component<HelloWorldProps, any> {
  static propTypes: React.ValidationMap<any> = {
    kind: React.PropTypes.oneOf([ComponentKind.primary, ComponentKind.warning]).isRequired
  };

  render() {
    return (
      <div style={[styles.base, styles[this.props.kind]]}>
          <h1>Hello, {this.props.name}...</h1>
          <img src={require('./images/twitter.svg')} width="100" />
        </div>
    );
  }
}
