import * as Radium from 'radium';
import * as React from 'react';

export enum Kind {
  h1,
  h2
}

export interface HeaderProps extends React.Props<any> {
  kind: Kind;
}

const styles = {
  base: {
    color: '#000',
    fontWeight: 'bold',
    borderBottom: '1px solid black',
    margin: '0.5em 0',
  },
 
  [Kind.h1]: {
    fontSize: '2em',
  },

  [Kind.h2]: {
    fontSize: '1.5em',
  }
};

@Radium
export default class Header extends React.Component<HeaderProps, any> {
  static propTypes: React.ValidationMap<any> = {
    kind: React.PropTypes.oneOf([Kind.h1, Kind.h2]).isRequired
  };

  render() {
    return <div ref="root" style={[styles.base, styles[this.props.kind]]}>
      {this.props.children}
    </div>
  }
}
