import { createStore, combineReducers, compose } from 'redux';
import { createHistory } from 'history';
import reducers from '../reducers';

declare const DEVELOPMENT;

const { syncReduxAndRouter, routeReducer } = require('redux-simple-router');

const reducersWithRouting = combineReducers(Object.assign({}, reducers, { routing: routeReducer }));
const history = createHistory();
const middlewares = [];

if (DEVELOPMENT) {
  const DevTools = require('../containers/devtools').default;
  middlewares.push(DevTools.instrument());
}

const applicationCreateStore = compose.apply(null, middlewares)(createStore);
const store = applicationCreateStore(reducersWithRouting);

syncReduxAndRouter(history, store);

export default store;
