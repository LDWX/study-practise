import React from 'react';
import { useSelector } from 'react-redux';
import style from './style.less';
 
export default function App({ count, loading, list, addItem, dispatch }) {
  return (
    <div className={style.App}>
      <h2>About-1</h2>
      <p>count { count }</p>
      <p>
      { 
        list.map(({ id, title }) => <button key={id}>{title}</button>)
      }
      { loading && <><br />请求中...</> }
      </p>
      <button
        onClick={() => addItem({ id: Math.random(), title: `title-${list.length + 1}` })
      }>加一个元素</button>
    </div>
  );
}