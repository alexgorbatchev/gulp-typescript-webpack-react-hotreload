import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Link } from 'react-router';

export default class Application extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Link to="/blog">blog</Link> | 
        <Link to="/about">about</Link>   
             
        {this.props.children}
      </div>
    );
  }
}
