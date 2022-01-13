import React, { useState, useEffect } from 'react';

function UseState() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log(`mount + update: ${count}`); // 只要本组件有更新，就会执⾏
  });
  
  useEffect(() => {
    console.log(`mount: ${count}`); // 只在本组件第⼀次加载才会执⾏
  }, []);
  
  useEffect(() => {
    console.log(`mount + update count: ${count}`); // 只要 count 发⽣变化，就执⾏
  }, [count]);
  
  return (
    <button onClick={() => setCount(c => c + 1)}>加⼀ {count}</button>
  );
}

export default function Parent() {
  const [count, setCount] = useState(0);
  return (<>
    <UseState />
    <button onClick={() => setCount(c => c + 1)}>父组件加⼀ {count}</button>
  </>);
}