// 提供跨组件传递信息的能⼒，搭配 createContext 使⽤
import React, { useState, createContext, useContext } from 'react';

// 1. 创建共享数据源对象
const Context = createContext();

// ⽗组件使⽤ Provider 包裹所有的后代组件
export default function Parent() {
  const [count, changeCount] = useState(0);

  const store = {
    count, changeCount,
  };
  return ( // 2. 数据源注⼊到根组件
    <Context.Provider value={store}>
      <button onClick={() => changeCount(count + 1)}>加⼀ {count}</button>
      <Sub1 />
    </Context.Provider>
  );
}
// ⼦组件使⽤ useContext 调⽤⽅法，这⾥并没有传递 props
function Sub1() {
  const ctx = useContext(Context);
  return <>
    <button onClick={() => ctx.changeCount(c => c + 1)}>
      Sub1 能通过 Context 访问数据源 { ctx.count }
    </button>
    <Sub2 />
  </>;
}

 // 后代组件使⽤ useContext 取数据，这⾥并没有传递 props
 function Sub2() {
   const ctx = useContext(Context);
   return <span>后代组件 Sub2 拿到的 Parent 数据: { ctx.count }</span>;
 }