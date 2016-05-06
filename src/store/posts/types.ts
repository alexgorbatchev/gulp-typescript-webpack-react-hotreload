import { IAction, IFetching, INormalized, IPayloadAction } from '../interfaces';

export interface IAuthor {
  id: string;
  name: string;
  email: string;
}

export interface IPost {
  id: string;
  title: string;
  body: string;
  author: IAuthor | string;
}

export interface IPostsJSON {
  data: IPost[];
}

export interface IPostsState extends IFetching, INormalized<IPost[], number[]> { }

export interface IPostsAction extends IPayloadAction<IPostsJSON> { }

export const REQUEST_POSTS: string = 'REQUEST_POSTS';
export const RECEIVE_POSTS: string = 'RECEIVE_POSTS';
