import * as Radium from 'radium';
import * as React from 'react';

export enum Kind {
  primary,
  warning
}

export interface BannerProps extends React.Props<any> {
  kind: Kind;
}

const styles = {
  base: {
    color: '#fff',
  },
 
  [Kind.primary]: {
    background: '#0074D9',
  },

  [Kind.warning]: {
    background: '#FF4136',
  }
};

@Radium
export default class Banner extends React.Component<BannerProps, any> {
  static propTypes: React.ValidationMap<any> = {
    kind: React.PropTypes.oneOf([Kind.primary, Kind.warning]).isRequired
  };

  render() {
    return <div ref="root" style={[styles.base, styles[this.props.kind]]}>
      <img ref="logo" src={require('../images/twitter.svg')} width="20" />
    </div>
  }
}
