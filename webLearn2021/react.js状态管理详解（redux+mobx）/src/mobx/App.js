import React from 'react'
import { observable, reaction } from 'mobx';
import { observer } from 'mobx-react';

/* const data = observable({ value: 0, d: 1 });
// const data0 = observable.box(0);

const dispose = reaction( // dispose 类似于 unsubscribe
  () => data.value,
  (cur, prev) => {
    console.log(cur, prev);
    if (cur > 3) {
      dispose();
      // alert('不再追踪 data');
    }
});

export default observer(function Mobx() {
  const value = data.value;
  const onChange = () => {
    data.value++;
  };
  return (
    <button onClick={onChange}>改变 data { value }</button>
  );
}) */

const primitive = observable.box(0);
// 如果你了解过 Vue3 的 ref 方法，你也就理解这种做法和实现原理了。
export default observer(function Mobx() {
  const value = primitive.get(); // 取值方式
  const onChange = () => {
    primitive.set(value + 1); // 更新方式
  };
  return (
    <button onClick={onChange}>改变 data{ value }</button>
  );
});