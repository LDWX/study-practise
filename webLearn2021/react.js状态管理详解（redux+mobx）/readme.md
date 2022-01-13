#### 技术主栈
- antd
- axios
- react
- redux
- webpack
- babel

#### 注意点
- react-router-dom 6.x 版本的 使用方式变化比较大[升级指南](https://reactrouter.com/docs/en/v6/upgrading/v5)
> Routes 替换了 Switch，useRoutes [支持配置式的方式，详见](https://reactrouter.com/docs/en/v6/api)
> useNavigate 替换 useHistory，
  > before: const navigate = useNavigate(); navigate('/home');
  > after: const history = useHistory();  history.push('/home');

- 提供了 3 种不同形态的代码实现方式，可据自己喜好选一种来写。
###### react-redux 传统的状态注入方式，如 About 文件夹
> model 内分别实现 reducer、action 后，要在根 reducer 进行注入，注入过程在 src/core/reducers 中
> 组件获取 store 中的状态，需要 connect 来建立连接  src/About/index

###### react-redux 传统的状态注入方式 + hooks 取值，如 Home 文件夹
> model 内分别实现 reducer、action 后，要在根 reducer 进行注入，注入过程在 src/core/reducers 中
> 组件获取 store 中的状态，使用 useSelector 和 useDispatch，见 src/Home/index

###### 前两种方式是为各个模块实现了自己的 reducer，注入到全局，因此 action 的类型有一个命名空间的讲究（加了模块前缀）。而本方式（见 Dynamic 模块）实现了 reducer 后，由使用的地方初始化状态 src/Dynamic/index.js useReducer 那一行。
> 这里的状态不在全局，因此其他相似模块也可以基于这个 reducer 创建状态。eg:
```
// 模块 Other
import reducer from '@/Dynamic/reducer';
import { useReducer } from 'react';

function Other() {
  const [state, dispatch] = useReducer(reducer, { count: 2 });
  const [data, dispatchData] = useReducer(reducer, { count: 3 });
  
  return <>
    { state.count }
    { data.count }
  </>
}

```
> 说白了，这样的 reducer 成为了一个针对特定格式的状态（这里是 { cout: xxx }）进行维护的可复用函数。useReducer 与 useState 基本一致，只是将一些复杂的逻辑拿到了 reducer 内处理。
> 如果需要全局共享（前两种代码通过 src/core/store 注入根组件），可以把 useReducer 声明在顶层，并使用 context API 向下传递即可。
> 某种意义上，useReducer 的出现可以将 redux、react-redux 给替换掉。但是 redux 固定的样板代码依然对于大型项目的维护起到积极作用。推荐第二种实现方式（Home 模块的写法），既保留 redux 的格式，又规避了 react-redux connect 的丑陋注入方式。

#####
- axios 进行了二次封装，见 src/api.js，使用形式见 src/Dynamic/service.js
- 所有的请求参数均以对象形式传递（夹在地址栏的动态参数也可以）