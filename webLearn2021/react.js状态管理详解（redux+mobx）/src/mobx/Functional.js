import React, { useState, useEffect } from 'react';
import { api } from './AsyncMobx';
import { autorun } from 'mobx'
import { useLocalObservable, Observer } from 'mobx-react';

function useAutorun(...args) {
  useEffect(() => {
    // 除了 mount，这里的逻辑不会因为 state.loading 的变化而执行，因为组件更新只限定在
    // 了 Observer 内。
    
    return autorun(...args);
  }, []);
}

export default function FunctionalMobx() {
  // const [state] = useState(() => new State());
  const state = useLocalObservable(() => ({
      list: [],
      get length() {
        return this.list.length;
      },
      loading: false,
      async onFetch(string) { // 内部的 this 已经默认绑定到了 state
        this.loading = true;
        const { data } = await api(string);
        this.list = data;
        this.loading = false;
      },
      onChange(item) {
        item.name = '修改了';
      },
      onAdd() {
        this.list.push({ name: '添加', id: '1' });
      }
    }));
    
  useAutorun(() => { // dispose
    if (state.loading) {
      
    }
  });
  
  if (state.loading) {
    return <p>loading...</p>;
  }
  
  const Item = ({ item }) => {
    
    return <Observer>
      {
        () => {
          console.log('重新渲染');
          return <p key={item.id} onClick={() => state.onChange(item)}>{ item.name }</p>
        }
      }
    </Observer>;
  }

  return (
    <>
      <Observer>
        {
          () => state.list.map((item) => <Item item={item} key={item.id} />)
        }
      </Observer>
      <button onClick={() => state.onFetch('响应')}>获取数据</button>
      <button onClick={state.onAdd}>添加</button>
      <Sub store={state} />
    </>
  );
}


function Sub({ store }) {
  const state = useLocalObservable(() => ({
    count: 1,
    onChange() {
      this.count++;
    }
  }));
  return (<Observer>{ () => store.length }</Observer>);
}