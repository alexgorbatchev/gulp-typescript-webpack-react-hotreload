import * as Radium from 'radium';
import * as React from 'react';
import { readFileSync } from 'fs';

const toDataURI = (mediaType: string, value: string): string =>
  `data:${mediaType};base64,${value}`;

const toSVGDataURI = (value: string): string =>
  toDataURI('image/svg+xml', value);

const TWITTER_SVG = toSVGDataURI(readFileSync(`${__dirname}/twitter.svg`, 'base64'));

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
export default class BannerComponent extends React.Component<BannerProps, any> {
  // static propTypes: React.ValidationMap<any> = {
  //   kind: React.PropTypes.oneOf([BannerKind.primary, BannerKind.warning]).isRequired
  // };

  render() {
    return (
      <div ref="root" style={[styles.base, styles[this.props.kind]]}>
        <img ref="logo" src={TWITTER_SVG} width="20" />
      </div>
    );
  }
}
