export interface IPost {
  color: string;
  value: string;
}

export interface IPostsState {
  isFetching: boolean;
  items: Array<IPost>;
}
