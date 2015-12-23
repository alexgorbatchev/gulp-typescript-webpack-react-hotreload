import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Promise } from 'es6-promise'; 
import BannerPromise from '../../components/banner';
import HeaderPromise from '../../components/header';

let Banner, Header;

export default class extends React.Component<any, any> {
  componentDidMount() {
    Promise.all([ BannerPromise, HeaderPromise ])
      .then(results => [ Banner, Header ] = results)
      .then(() => this.forceUpdate());
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
