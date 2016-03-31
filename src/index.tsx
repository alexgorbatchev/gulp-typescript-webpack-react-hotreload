require('object.assign/polyfill')();

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import store from './store';

declare const SHA;

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} />
  </Provider>
  , document.getElementById('root')
);

document.getElementById('time').innerHTML = new Date().toString();
document.getElementById('sha').innerHTML = SHA;
