import * as React from 'react';
import Banner, { BannerKind } from 'components/BannerComponent';

export default class BlogComponent extends React.Component<any, any> {
  render() {
    return (
      <div>
        <h2>Blog</h2>
        <Banner kind={BannerKind.warning} />
      </div>
    );
  }
}
