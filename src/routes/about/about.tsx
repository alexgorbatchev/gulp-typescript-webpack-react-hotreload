import * as React from 'react';
import * as ReactDOM from 'react-dom';

let Banner, Header;

export default class extends React.Component<any, any> {
  componentDidMount() {
    require.ensure([], () => {
      Banner = require('../../components/banner');
      Header = require('../../components/header');
      this.forceUpdate();
    });
  }
  
  render() {
    if (!Banner) {
      return <div/>;
    }
    
    return (
      <div>
        <Header.default kind={Header.Kind.h2}>About</Header.default>
        <Banner.default name="Boss" kind={Banner.Kind.primary} />
      </div>
    );
  }
}
