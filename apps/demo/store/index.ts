import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { createHistory } from 'history';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';

const { syncReduxAndRouter, routeReducer } = require('redux-simple-router');

declare const DEVELOPMENT;

const history = createHistory();

const allReducers = combineReducers(Object.assign({},
  reducers,
  {
    routing: routeReducer
  }
));

const middlewares = applyMiddleware(
  thunkMiddleware
);

const composeList = [
  middlewares,
];

if (DEVELOPMENT) {
  const DevTools = require('../containers/devtools').default;
  composeList.push(DevTools.instrument());
}

const applicationCreateStore = compose(...composeList)(createStore);
const store = applicationCreateStore(allReducers);

syncReduxAndRouter(history, store);

export default store;
