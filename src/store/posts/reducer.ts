import {
  RECEIVE_POSTS,
  REQUEST_POSTS,
  IPostsState,
  IPostsAction,
} from './';

const initialState: IPostsState = {
  isFetching: false,
  items: [],
};

export function postsReducer(state: IPostsState = initialState, action: IPostsAction): IPostsState {
  switch (action.type) {
    case RECEIVE_POSTS:
      return Object.assign({}, state, { items: action.items, isFetching: false });
    case REQUEST_POSTS:
      return Object.assign({}, state, { isFetching: true });
    default:
      return state;
  }
}
