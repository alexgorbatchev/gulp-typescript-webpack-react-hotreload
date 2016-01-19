import * as React from 'react';
import Header, { HeaderKind } from '../header';
import Banner, { BannerKind } from '../banner';

export default class ContactComponent extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Header kind={HeaderKind.h2}>Contact</Header>
        <Banner kind={BannerKind.warning}/>
      </div>
    );
  }
}
