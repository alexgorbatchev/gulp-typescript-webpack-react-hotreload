import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Link } from 'react-router';

export default class extends React.Component<any, any> {
  render() {
    return (
      <div>
        <h1>Welcome!</h1>
        
        <Link to="/home">home</Link> | 
        <Link to="/about">about</Link>   
             
        {this.props.children}
      </div>
    );
  }
}
