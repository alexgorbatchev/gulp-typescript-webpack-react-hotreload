import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Header, { HeaderKind } from 'shared-components/header';
import Banner, { BannerKind } from 'shared-components/banner';

export default class Team extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Header kind={HeaderKind.h2}>Team!</Header>
        <Banner kind={BannerKind.warning}/>
      </div>
    );
  }
}
