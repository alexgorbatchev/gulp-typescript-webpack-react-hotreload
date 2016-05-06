const { normalize, Schema, arrayOf } = require('normalizr');
import { RECEIVE_POSTS, REQUEST_POSTS, IPostsState, IPostsAction }  from './types';
import { IPayloadAction, IReducerMap } from '../interfaces';

const initialState: IPostsState = {
  isFetching: false,
  entities: [],
  result: [],
};

const article = new Schema('articles');
const user = new Schema('users');
article.define({ author: user });

const REDUCERS: IReducerMap<IPostsState, IPostsAction> = {
  [RECEIVE_POSTS](state: IPostsState, action: IPostsAction): IPostsState {
    const { entities, result } = normalize(action.payload.data, arrayOf(article));
    return Object.assign({}, state, {
      entities,
      result,
      isFetching: false
    });
  },

  [REQUEST_POSTS](state: IPostsState, action: IPostsAction): IPostsState {
    return Object.assign({}, state, { isFetching: true });
  },
};

export function postsReducer(state: IPostsState = initialState, action: IPostsAction): IPostsState {
  const reducer = REDUCERS[action.type];
  return reducer ? reducer(state, action) : state;
}
