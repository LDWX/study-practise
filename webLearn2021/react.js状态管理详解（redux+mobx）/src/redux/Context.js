import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

function useCountContext() {
  return useContext(Context);
}

/* function Sub() {
  return <Context.Consumer>
  {
    ctx => <div>
      { ctx.count }
      <button onClick={ctx.increment}>增加</button>
      <button onClick={ctx.decrement}>减少</button>
    </div>
  }
  </Context.Consumer>
}
 */

// 子组件通过 context 拿到上层数据
function Sub() {
  const ctx = useCountContext(); // 也可以使用 Consumer 来获取 context 对象
  return (
    <div>
      { ctx.count }
      <button onClick={ctx.increment}>增加</button>
      <button onClick={ctx.decrement}>减少</button>
    </div>
  );
}



// 父组件通过 Context.Provider 传递数据到下级、后代组件
export default function Parent() {
  const [count, setCount] = useState(0);
  const value = {
    count,
    increment() {
      setCount(c => c + 1);
    },
    decrement() {
      setCount(c => c - 1);
    }
  };
  
  return (
    <Context.Provider value={value}>
      <Sub />
    </Context.Provider>
  );
}