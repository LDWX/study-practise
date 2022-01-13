import React, { useState, useCallback, memo, useMemo } from 'react';

const UseCallbackSub = memo(({ value, onChange }) => { // shouldComponentUpdate
  console.log('⼦元素发⽣了渲染 value: ', value);
  return <input onChange={onChange} value={value} type="number" />;
}, (prev, next) => prev.value === next.value); // shallowEqual

export default function UseCallback() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);
  // 每次修改 count 时，本组件发⽣渲染⽆可厚⾮，
  // 但是⼦组件 UseCallbackSub 也会进⾏不必要的渲染
  const onClick = () => {
    setCount(count + 1);
  };
  const onChange = useCallback(e => {
    setValue(e.target.value);
    console.log(count);
  }, [count]);
  
  /* const onChange = useMemo(() => e => {
    setValue(e.target.value);
    console.log(count);
  }, [count]); */
  
  return (<>
    <button onClick={onClick}>count 发⽣变化{ count }</button>
    <UseCallbackSub onChange={onChange} value={value} />
  </>);
}