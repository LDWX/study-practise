import { ADD_ITEM, ADD_COUNT, CHANGE_LOADING } from './CONST';

export const addItem = payload => (dispatch, getState) => {
  // 这是个异步操作
  dispatch({ type: CHANGE_LOADING, payload: true });
  setTimeout(() => {
    dispatch({ type: ADD_ITEM, payload });
    dispatch({ type: CHANGE_LOADING, payload: false });
  }, 2000)
};

export const deleteItem = item => {
  
};