import {
  RECEIVE_COLORS,
  REQUEST_COLORS,
  IColorsState,
  IColorAction,
} from './';

const initialState: IColorsState = {
  isFetching: false,
  items: [],
};

export function colorsReducer(state: IColorsState = initialState, action: IColorAction): IColorsState {
  switch (action.type) {
    case RECEIVE_COLORS:
      return Object.assign({}, state, { items: action.items, isFetching: false });
    case REQUEST_COLORS:
      return Object.assign({}, state, { isFetching: true });
    default:
      return state;
  }
}
