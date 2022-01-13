const INCREMENT = 'dynamic/INCREMENT';
const DECREMENT = 'dynamic/DECREMENT';

const handler = {
  [INCREMENT](state) {
    return {count: state.count + 1};
  },
  [DECREMENT](state) {
    return { count: state.count - 1 };
  }
};


export default (state, { type, payload }) => handler[type] ? handler[type](state, payload) : state;
