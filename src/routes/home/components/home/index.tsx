import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Banner, { BannerKind } from 'shared-components/banner';

export default class Home extends React.Component<any, any> {
  render() {
    return (
      <div>
        <h2>Home</h2>
        <Banner kind={BannerKind.warning} />
      </div>
    );
  }
}
