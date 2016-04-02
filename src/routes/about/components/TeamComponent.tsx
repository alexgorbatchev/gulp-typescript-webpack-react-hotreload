import * as React from 'react';
import Header, { HeaderKind } from 'components/HeaderComponent';
import Banner, { BannerKind } from 'components/BannerComponent';

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
