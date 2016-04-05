import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import CounterReducer from './counter/CounterReducer';
import ColorsReducer from './colors/ColorsReducer';

const { syncHistoryWithStore, routerReducer } = require('react-router-redux');

declare const DEVELOPMENT;

const enhancers = [];

if (DEVELOPMENT) {
  const DevTools = require('../routes/root/containers/DevToolsContainer').default;
  enhancers.push(DevTools.instrument());
}

const reducer = combineReducers({
  counter: CounterReducer,
  colors: ColorsReducer,
  routing: routerReducer
});
const initialState = {};
const enhancer = compose(applyMiddleware(thunk), ...enhancers);
const store = createStore(reducer, initialState, enhancer);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

export { store, history };
