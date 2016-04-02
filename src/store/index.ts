import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { createHistory } from 'history';
import thunkMiddleware from 'redux-thunk';
import CounterReducer from './counter/CounterReducer';
import ColorsReducer from './colors/ColorsReducer';

const { syncReduxAndRouter, routeReducer } = require('redux-simple-router');

declare const DEVELOPMENT;

const history = createHistory();

const allReducers = combineReducers(Object.assign({},
  CounterReducer,
  ColorsReducer,
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
  const DevTools = require('../routes/root/containers/DevToolsContainer').default;
  composeList.push(DevTools.instrument());
}

const applicationCreateStore = compose(...composeList)(createStore);
const store = applicationCreateStore(allReducers);

syncReduxAndRouter(history, store);

export default store;
