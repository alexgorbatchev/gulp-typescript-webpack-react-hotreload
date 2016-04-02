import * as React from 'react';
import { Link } from 'react-router';
import Header, { HeaderKind } from 'components/HeaderComponent';
import Banner, { BannerKind } from 'components/BannerComponent';

export default class AboutComponent extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Header kind={HeaderKind.h1}>About</Header>
        <Banner kind={BannerKind.primary}/>

        <Link to="/about/contact">contact us</Link> |
        <Link to="/about/team">team</Link>

        {this.props.children}
      </div>
    );
  }
}
