import { INCREASE_COUNTER, DECREASE_COUNTER, ICounterState } from './';
import { handleActions } from 'redux-actions';

const initialState: ICounterState = {
  value: 0
};

export const counterReducer = handleActions<ICounterState>({
  [INCREASE_COUNTER]: (state, action) => ({
    value: state.value + action.payload.value
  }),

  [DECREASE_COUNTER]: (state, action) => ({
    value: state.value - action.payload.value
  }),
}, initialState);
