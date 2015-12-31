import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Banner, { BannerKind } from 'shared-components/banner';

export default class Blog extends React.Component<any, any> {
  render() {
    return (
      <div>
        <h2>Blog</h2>
        <Banner kind={BannerKind.warning} />
      </div>
    );
  }
}
