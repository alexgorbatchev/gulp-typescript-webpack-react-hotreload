import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router';
import Application from './application';

declare var VERSION: string;

const root = (
  <Router>
    <Route path="/" component={Application}/>
    </Router>
);

ReactDOM.render(root, document.getElementById('root'));

document.getElementById('time').innerHTML = new Date().toString();
document.getElementById('sha').innerHTML = VERSION;
