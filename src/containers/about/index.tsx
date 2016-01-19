import * as React from 'react';
import About from '../../components/about';

export default class AboutContainer extends React.Component<any, any> {
  render() {
    return <About {...this.props} />;
  }
}
