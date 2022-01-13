import React from 'react';
import { inject, Observer } from 'mobx-react';

function MobxReact({ home, about }) {
  return (
    <h3>
      <h2>mobx-react</h2>
      <button onClick={() => home.onChange(Math.random())}>
        home: 
        <Observer>{ () => home.data }</Observer>
      </button>
      <br />
      <button onClick={() => about.onChange(Math.random())}>
        about: 
        <Observer>{ () => about.value }</Observer>
      </button>
    </h3>
  );
}

// export default inject('home', 'about')(MobxReact);
 export default inject(({ home, about }) => ({ home, about }))(MobxReact);
/*
// 以下的两种形式也可以
// 1. 
// 2. 
@inject('home', 'about')
class MobxReact extends Component {}
export default MobxReact; */