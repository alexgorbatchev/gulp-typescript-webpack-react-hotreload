import * as React from 'react';

interface HelloWorldProps extends React.Props<any> {
  name: string;
}

export default class App extends React.Component<HelloWorldProps, any> {
  render() {
    return (
      <h1>Hello, {this.props.name}...</h1>
    );
  }
}
