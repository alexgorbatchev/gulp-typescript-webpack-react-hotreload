import { INCREASE_COUNTER, ICounterState, ICounterAction } from './';

const initialState: ICounterState = { value: 0 };

export default function counterReducer(state: ICounterState = initialState, action: ICounterAction): ICounterState {
  switch (action.type) {
    case INCREASE_COUNTER:
      return Object.assign({}, state, { value: state.value + action.amount });
    default:
      return state;
  }
}
