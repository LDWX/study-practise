import * as types from './CONST';

export function addItem(payload) {
  return { type: types.ADD_ITEM, payload };
};

export function addCount() {
  return { type: types.ADD_COUNT };
};