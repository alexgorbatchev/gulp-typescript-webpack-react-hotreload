import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router';
import routes from './routes';

declare var VERSION: string;

const root = (
  <Router routes={routes} />
);

ReactDOM.render(root, document.getElementById('root'));

document.getElementById('time').innerHTML = new Date().toString();
document.getElementById('sha').innerHTML = VERSION;
