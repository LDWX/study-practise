import React, { Component } from 'react';
import { reaction, autorun, makeObservable, action, observable, flow, computed, runInAction } from 'mobx';
import { observer } from 'mobx-react';

// 假装这是一个请求接口
export const api = (name = '') => new Promise(resolve => {
  setTimeout(() => {
    const length = Math.ceil(Math.random() * 10);
    resolve({
      code: 200,
      data: Array(length).fill(0).map((_, index) => ({ name: name + Math.random(), id: index }))
    });
  }, 1000);
});

class State {
  constructor() {
    // 这里不是自动处理，而是人为控制哪些数据具有响应能力，哪些方法是修改状态的
    makeObservable(this, {
      list: observable,
      loading: observable,
      assign: action.bound, // 如果你比较懒，这么干也不是不可以，该方法不是必须的
      overflow: computed // 顺带把衍生值学了，衍生的属性只能访问，不要直接修改
    });
  }
  list = []
  loading = false
  get overflow() {
    return this.list.length > 5; // list 长度变化就会重新计算  
  }
  // flow 是优雅地处理异步 action 的方法，所以这里相当于内部的代码也运行在 action 的作用内。
  onFetch = flow(function *(string) {
    this.loading = true;
    const { data } = yield api(string); // 异常处理自己做~
    this.list = data;
    this.loading = false;
    // 或者 this.assign({ list: data, loading: false });
  })
  
  /* onFetch(string) {
    runInAction(() => {
      this.loading = true;
    });
    
    api(string).then(({ data }) => {
      runInAction(() => {
        // const { data } = await api(string); // 异常处理自己做~
        this.list = data;
        this.loading = false;
      });
    })
  }*/
  // 这样定义一个方法，会失去语义性，即你都不知道自己在做什么，只知道是在修改一个值
  assign(obj) {
    Object.assign(this, obj);
  }
  
}

export default @observer class Mobx extends Component {
  state = new State()
  dispose = autorun(() => {
    if (this.state.list.length > 5) {
      alert('exceeded');
    }
  })
  render() {
    if (this.state.loading) {
      return <p>loading...</p>;
    }
    return (
      <>
        <div>
          {
            this.state.list.map(item => (
              <p key={item.id}>{ item.name }</p>
            ))
          }
        </div>
        <button onClick={() => this.state.onFetch('响应')}>获取数据 
        {this.state.overflow && 'overflow:'}</button>
      </>
    );
  }
}