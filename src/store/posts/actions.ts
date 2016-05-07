import { REQUEST_POSTS, RECEIVE_POSTS, IPostsJSON, IPostsAction } from './types';
import { IThunk } from '../interfaces';
import fetch from 'isomorphic-fetch';

export function requestPosts(): IPostsAction {
  return { type: REQUEST_POSTS };
}

export function receivePosts(json: IPostsJSON): IPostsAction {
  return { type: RECEIVE_POSTS, payload: json };
}

export function fetchPosts(): IThunk {
  return function(dispatch) {
    dispatch(requestPosts());
    return fetch('/fixtures/posts.json')
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)));
  };
}
