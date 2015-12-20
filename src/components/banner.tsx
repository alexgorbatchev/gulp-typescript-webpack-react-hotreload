import * as Radium from 'radium';
import * as React from 'react';

export enum BannerKind {
  primary,
  warning
}

export interface HelloWorldProps extends React.Props<any> {
  name: string;
  kind: BannerKind;
}

var styles = {
  base: {
    color: '#fff',
  },

  [BannerKind.primary]: {
    background: '#0074D9',
  },

  [BannerKind.warning]: {
    background: '#FF4136',
  }
};

export function foo() {
  throw new Error("sad face");
}

@Radium
export default class Banner extends React.Component<HelloWorldProps, any> {
  static propTypes: React.ValidationMap<any> = {
    kind: React.PropTypes.oneOf([BannerKind.primary, BannerKind.warning]).isRequired
  };

  render() {
    return (
      <div ref="root" style={[styles.base, styles[this.props.kind]]}>
        <h1>Hello, {this.props.name}...</h1>
        <img ref="logo" src={require('../images/twitter.svg')} width="100" />
      </div>
    );
  }
}
