import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Link } from 'react-router';
import Header, { HeaderKind } from '../header';
import Banner, { BannerKind } from '../banner';

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
