import * as Radium from 'radium';
import * as React from 'react';

export enum BannerKind {
  primary,
  warning
}

export interface BannerProps extends React.Props<any> {
  kind: BannerKind;
}

const styles = {
  base: {
    color: '#fff',
  },
 
  [BannerKind.primary]: {
    background: '#0074D9',
  },

  [BannerKind.warning]: {
    background: '#FF4136',
  }
};

@Radium
export default class Banner extends React.Component<BannerProps, any> {
  // static propTypes: React.ValidationMap<any> = {
  //   kind: React.PropTypes.oneOf([BannerKind.primary, BannerKind.warning]).isRequired
  // };

  render() {
    return <div ref="root" style={[styles.base, styles[this.props.kind]]}>
      <img ref="logo" src={require('./twitter.svg')} width="20" />
    </div>
  }
}
