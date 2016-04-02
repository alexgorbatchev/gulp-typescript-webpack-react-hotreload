import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { createHistory } from 'history';
import thunkMiddleware from 'redux-thunk';
import CounterReducer from './counter/CounterReducer';
import ColorsReducer from './colors/ColorsReducer';

const { syncHistoryWithStore, routerReducer } = require('react-router-redux');

declare const DEVELOPMENT;

const history = createHistory();

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

syncHistoryWithStore(history, store);

export default store;
