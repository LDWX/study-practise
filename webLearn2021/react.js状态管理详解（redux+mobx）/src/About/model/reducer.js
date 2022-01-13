import * as types from './CONST';

const initialState = {
  loading: false,
  count: 1,
  list: []
};

const handler = {
  [types.CHANGE_LOADING](state, loading) {
    return { ...state, loading };
  },
  [types.ADD_COUNT](state) {
    const count = state.count + 1;
    return { ...state, count };
  },
  [types.ADD_ITEM](state, payload) {
    const list = state.list.concat(payload);
    return { ...state, list };
  }
};

export default (state = initialState, { type, payload }) => handler[type] ? handler[type](state, payload) : state;
