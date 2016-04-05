import { REQUEST_COLORS, RECEIVE_COLORS, IColor } from './';
import { IAction, IThunk } from '../interfaces';
import fetch from 'isomorphic-fetch';

export interface IColorAction extends IAction {
  items: Array<IColor>;
}

export function requestColors(): IColorAction {
  return { type: REQUEST_COLORS, items: null };
}

export function receiveColors(items: Array<IColor>): IColorAction {
  return { type: RECEIVE_COLORS, items };
}

export function fetchColors(): IThunk {
  return function(dispatch) {
    dispatch(requestColors());
    return fetch('/fixtures/colors.json')
      .then(response => response.json())
      .then(json => dispatch(receiveColors(json)));
  };
}
