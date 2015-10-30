import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Component, {ComponentKind} from './component';

export default class Application extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Component name="World" kind={ComponentKind.primary} />
        </div>
    );
  }
}
