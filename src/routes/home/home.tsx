import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Promise } from 'es6-promise'; 
import BannerPromise from '../../components/banner';

let Banner;

export default class extends React.Component<any, any> {
  componentDidMount() {
    Promise.all([ BannerPromise ])
      .then(results => [ Banner ] = results)
      .then(() => this.forceUpdate());
  }
  
  render() {
    if (!Banner) {
      return <div/>;
    }
    
    return (
      <div>
        <h2>Home</h2>
        <Banner.default name="Boss" kind={Banner.Kind.warning} />
      </div>
    );
  }
}
