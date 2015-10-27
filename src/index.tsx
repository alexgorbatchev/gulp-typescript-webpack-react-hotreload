/// <reference path="../typings/tsd.d.ts" />

import * as React from 'react';
import * as Radium from 'radium';
import Component, {ComponentKind} from './component';

React.render(<Component name="World" kind={ComponentKind.warning} />, document.getElementById('root'));

document.getElementById('time').innerHTML = new Date().toString();
