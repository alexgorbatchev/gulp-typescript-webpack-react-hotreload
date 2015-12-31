require('es6-promise').polyfill();

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router';
import routes from './routes';

declare var ENV: string;
declare var SHA: string;

ReactDOM.render(<Router routes={routes} />, document.getElementById('root'));

document.getElementById('time').innerHTML = new Date().toString();
document.getElementById('sha').innerHTML = `${ENV} ${SHA}`;
