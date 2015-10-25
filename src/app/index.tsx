import * as React from 'react';
import Component, {ComponentKind} from './component';

React.render(<Component name="World" kind={ComponentKind.warning} />, document.getElementById('root'));

document.getElementById('time').innerHTML = new Date().toString();
