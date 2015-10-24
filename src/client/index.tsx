import * as React from 'react';
import App, {AppKind} from './App';

React.render(<App name="World" kind={AppKind.warning} />, document.getElementById('root'));

document.getElementById('time').innerHTML = new Date().toString();
