import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router';
import childRoutes from './routes';
import Application from './application';

declare var VERSION: string;

const routes = [
  {
    path: '/', 
    component: Application,
    childRoutes,
  }
];


const root = (
  <Router routes={routes} />
);

ReactDOM.render(root, document.getElementById('root'));

document.getElementById('time').innerHTML = new Date().toString();
document.getElementById('sha').innerHTML = VERSION;
