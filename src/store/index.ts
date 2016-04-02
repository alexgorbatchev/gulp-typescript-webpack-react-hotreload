import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import CounterReducer from './counter/CounterReducer';
import ColorsReducer from './colors/ColorsReducer';

const { syncHistoryWithStore, routerReducer } = require('react-router-redux');

declare const DEVELOPMENT;

const allReducers = combineReducers(Object.assign({},
  {
    counter: CounterReducer,
    colors: ColorsReducer,
    routing: routerReducer
  }
));

const middlewares = applyMiddleware(
  thunkMiddleware
);

const composeList = [
  middlewares,
];

if (DEVELOPMENT) {
  const DevTools = require('../routes/root/containers/DevToolsContainer').default;
  composeList.push(DevTools.instrument());
}

const applicationCreateStore = compose(...composeList)(createStore);
const store = applicationCreateStore(allReducers);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

export { store, history };
