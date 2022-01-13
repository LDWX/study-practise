import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from './model/action';
import styles from './style.less';

export default function Container() {
  const { count, list } = useSelector(({ home }) => home);
  const dispatch = useDispatch();

  const addCount = () => {
    dispatch(actions.addCount());
    // 如果你这样写也可以，但是不推荐，UI 组件不应该植入业务逻辑，你要真的不考虑可读性、复用性的话，这么干的人还挺多的
    /* dispatch({
      type: 'home/ADD_COUNT'
    }); */
  };
  
  const addItem = () => {
    dispatch(actions.addItem({ id: Math.random(), title: `title-${list.length + 1}` }));
  };

  return (
    <div className={styles.Home}>
      <h2>HOME</h2>
      <p>count { count }</p>
      <p>
      { 
        list.map(({ id, title }) => <button key={id}>{title}</button>)
      }
      </p>
      <button onClick={addItem}>加一个元素</button>
      <button onClick={addCount}>count 加一</button>
    </div>
  );
}