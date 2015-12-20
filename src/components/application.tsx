import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Banner, { BannerKind } from './banner';

export default class Application extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Banner name="World" kind={BannerKind.primary} />
      </div>
    );
  }
}
