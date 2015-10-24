import * as Radium from 'radium';
import * as React from 'react';

export enum AppKind {
  primary,
  warning
}

export interface HelloWorldProps extends React.Props<any> {
  name: string;
  kind: AppKind;
}

var styles = {
  base: {
    color: '#fff',
  },

  [AppKind.primary]: {
    background: '#0074D9',
  },

  [AppKind.warning]: {
    background: '#FF4136',
  }
};

@Radium
export default class App extends React.Component<HelloWorldProps, any> {
  static propTypes: React.ValidationMap<any> = {
    kind: React.PropTypes.oneOf([AppKind.primary, AppKind.warning]).isRequired
  };

  render() {
    return (
      <div style={[styles.base, styles[this.props.kind]]}>
          <h1>Hello, {this.props.name}...</h1>
          <div src="./images/twitter.svg" />
        </div>
    );
  }
}
