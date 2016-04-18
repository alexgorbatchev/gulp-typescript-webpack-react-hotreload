import { REQUEST_POSTS, RECEIVE_POSTS, IPost } from './';
import { IAction, IThunk, IData } from '../interfaces';
import fetch from 'isomorphic-fetch';

export interface IPostsAction extends IAction {
  items: Array<IPost>;
}

export function requestPosts(): IPostsAction {
  return { type: REQUEST_POSTS, items: null };
}

export function receivePosts(json: IData): IPostsAction {
  return { type: RECEIVE_POSTS, items: json.data };
}

export function fetchPosts(): IThunk {
  return function(dispatch) {
    dispatch(requestPosts());
    return fetch('/fixtures/posts.json')
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)));
  };
}
