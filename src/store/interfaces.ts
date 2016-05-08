import { Dispatch } from 'redux';
import { ICounterState } from './counter';
import { IPostsState } from './posts';

export interface IState {
  counter: ICounterState;
  posts: IPostsState;
}

export interface IAction {
  type: string;
}

export interface IPayloadAction<Payload> extends IAction {
  payload?: Payload;
}

export interface IErrorAction extends IAction {
  error: boolean;
}

export interface IFetching {
  isFetching?: boolean;
}

export interface IThunk {
  (dispatch: Dispatch): Promise<any>;
}

export interface INormalized<Entities, Result> {
  entities: Entities;
  result: Result;
}
