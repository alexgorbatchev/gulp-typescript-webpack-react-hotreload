import * as Radium from 'radium';
import * as React from 'react';

export enum HeaderKind {
  h1, h2
};

interface IHeaderProps extends React.Props<any> {
  kind: HeaderKind;
}

const styles = {
  base: {
    color: '#000',
    fontWeight: 'bold',
    borderBottom: '1px solid black',
    margin: '0.5em 0',
  },
 
  [HeaderKind.h1]: {
    fontSize: '2em',
  },

  [HeaderKind.h2]: {
    fontSize: '1.5em',
  }
};

@Radium
export default class HeaderComponent extends React.Component<IHeaderProps, any> {
  // static propTypes: React.ValidationMap<any> = {
  //   kind: React.PropTypes.oneOf([HeaderKind.h1, HeaderKind.h2]).isRequired
  // };

  render() {
    return <div ref="root" style={[styles.base, styles[this.props.kind]]}>
      {this.props.children}
    </div>
  }
}
