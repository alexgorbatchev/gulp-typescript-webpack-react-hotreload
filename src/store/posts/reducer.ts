const { normalize, Schema, arrayOf } = require('normalizr');
import { RECEIVE_POSTS, REQUEST_POSTS, IPost, IPostsState, IPostsAction }  from './types';
import { INormalized } from '../interfaces';

const initialState: IPostsState = {
  isFetching: false,
  entities: {
    posts: {},
    authors: {},
  },
  result: [],
};

const post = new Schema('posts');
const author = new Schema('authors');

post.define({ author });

function receivePosts(state: IPostsState, action: IPostsAction): IPostsState {
  const { entities, result } = <INormalized<IPost[], number[]>>normalize(action.payload.data, arrayOf(post));

  return Object.assign({}, state, {
    entities,
    result,
    isFetching: false
  });
}

function requestPosts(state: IPostsState, action: IPostsAction): IPostsState {
  return Object.assign({}, state, { isFetching: true });
}

export function postsReducer(state: IPostsState = initialState, action: IPostsAction): IPostsState {
  switch (action.type) {
    case RECEIVE_POSTS: return receivePosts(state, action);
    case REQUEST_POSTS: return requestPosts(state, action);
  }

  return state;
}
