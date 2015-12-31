require('es6-promise').polyfill();

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router';
import childRoutes from './routes';
import Application from './application';

declare var ENV: string;
declare var SHA: string;

const routes = [
  {
    path: '/', 
    component: Application,
    childRoutes,
  }
];

ReactDOM.render(<Router routes={routes} />, document.getElementById('root'));

document.getElementById('time').innerHTML = new Date().toString();
document.getElementById('sha').innerHTML = `${ENV} ${SHA}`;
