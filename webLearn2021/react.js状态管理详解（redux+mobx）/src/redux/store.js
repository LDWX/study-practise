import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

const initialState = { count: 0 };
const reducer = function (state = initialState, action) {
  switch (action.type) {
    case 'ADD': {
      return { count: state.count + action.payload };
    }
    case 'DECREMENT': {
      return { count: state.count - action.payload };
    }
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunk)); // 先忽略其他参数

/* @@observable: ƒ observable()
dispatch: ƒ dispatch(action)
getState: ƒ getState()
replaceReducer: ƒ replaceReducer(nextReducer)
subscribe: ƒ subscribe(listener) */
// 此处可以断点查看 store
export default store;
/* 

function createStore(reducer) {
  let state;
  const listeners = []; // 订阅事件的数组
  const getState = () => {
    return state;
  };

  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener()); // 更新组件
  };
 // () => {
 //    update([]); // 组件的强制刷新方法
 //  }

  const subscribe = listener => {
    if (!listeners.includes(listener)) {
      listeners.push(listener);
    }
    return function unsubscribe() {
      listeners = listeners.filter(l => l !== listener);
    };
  };
  dispatch({ type: '@@redux-init@@' });
  // 执行一次业务中不存在的 type，目的是初始化 state
  return { // 关注我们前面用到的 3 个接口
    getState, dispatch, subscribe,
  };
} */