import * as React from 'react';
import Header, { HeaderKind } from '../../../components/HeaderComponent';
import Banner, { BannerKind } from '../../../components/BannerComponent';

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
