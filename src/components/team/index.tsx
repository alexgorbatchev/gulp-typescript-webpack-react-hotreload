import * as React from 'react';
import Header, { HeaderKind } from '../header';
import Banner, { BannerKind } from '../banner';

export default class TeamComponent extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Header kind={HeaderKind.h2}>Team!</Header>
        <Banner kind={BannerKind.warning}/>
      </div>
    );
  }
}
