import * as React from 'react';
import * as ReactDOM from 'react-dom';

let Banner;

export default class extends React.Component<any, any> {
  componentDidMount() {
    require.ensure([], () => {
      Banner = require('../../components/banner');
      this.forceUpdate();
    });
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
