import thunk from 'redux-thunk';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { counterReducer } from './counter';
import { postsReducer, fetchPosts } from './posts';
import { IState } from './interfaces';

const { syncHistoryWithStore, routerReducer } = require('react-router-redux');

declare const DEVELOPMENT;

const enhancers = [];

if (DEVELOPMENT) {
  const DevTools = require('../routes/root/containers/DevToolsContainer').default;
  enhancers.push(DevTools.instrument());
}

const reducer = combineReducers({
  counter: counterReducer,
  posts: postsReducer,
  routing: routerReducer
});
const initialState = {};
const enhancer = compose(applyMiddleware(thunk), ...enhancers);
const store = createStore(reducer, initialState, enhancer);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

store.dispatch(fetchPosts());

export { IState, store, history };
export * from './posts';
export * from './counter';
