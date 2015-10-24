import * as React from 'react';
import App from './App';
import App1 = require('./App');

React.render(<App name="World" kind={App.Kinds.primary} />, document.getElementById('root'));

document.getElementById('time').innerHTML = new Date().toString();
