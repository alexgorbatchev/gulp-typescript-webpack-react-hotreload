import { INCREASE_COUNTER, CounterState, CounterAction } from './';

const initialState: CounterState = { value: 0 };

export default function counterReducer(state: CounterState = initialState, action: CounterAction): CounterState {
  switch (action.type) {
    case INCREASE_COUNTER:
      return Object.assign({}, state, { value: state.value + action.amount });
    default:
      return state;
  }
}
