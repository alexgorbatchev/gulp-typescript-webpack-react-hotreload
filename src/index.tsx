import * as React from 'react';
import * as Radium from 'radium';
import Component, {ComponentKind} from './component';

declare var VERSION: string;

console.log(VERSION);

React.render(<Component name="World" kind={ComponentKind.warning} />, document.getElementById('root'));

document.getElementById('time').innerHTML = new Date().toString();
