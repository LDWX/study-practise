import * as types from './CONST';

const initialState = {
  count: 1,
  list: []
};

const handler = {
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
