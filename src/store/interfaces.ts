import { Dispatch } from 'redux';

export interface IAction {
  type: string;
}

export interface IPayloadAction<Payload> extends IAction {
  payload: Payload;
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

export interface IReducerMap<TState, TAction> {
  [action: string]: (state: TState, action: TAction) => TState;
}
