import React, { useRef, useEffect } from 'react';

export default function UseRef() {
  const container = useRef(null);
  console.log('container', container); // 第⼀次是拿不到的

  useEffect(() => {
    console.log('container', container); // current 属性引⽤着虚拟 DOM 节点.
    // container.current.addEventListener('click', () => alert(0))
 }, []);

 return (<button ref={container}>Ref 容器</button>);
}