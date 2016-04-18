import { Dispatch } from 'redux';

export interface IAction {
  type: string;
}

export interface IThunk {
  (dispatch: Dispatch): Promise<any>;
}

export interface IData {
  data: any;
}
