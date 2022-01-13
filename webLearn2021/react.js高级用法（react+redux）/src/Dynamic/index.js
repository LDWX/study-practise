import React, { useEffect, useReducer } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import reducer from './reducer';
import { getDynamicData } from './service';
import styles from './style.less';

export default function Dynamic() {
  const params = useParams();
  const navigate = useNavigate();
  
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  const onSkip = () => {
    const id = Math.ceil(Math.random() * 100);
    navigate(`/dynamic/${id}`);
  };
  
  useEffect(() => {
    const onClose = message.loading('加载数据...', 15000);
    getDynamicData(params).then(data => {
      // 请求成功的话，data 直接就是数据，已经去掉了状态码和 message，详见 api.js 49 行
      console.log(data);
    }).catch(() => {
      // 请求失败的话，错误消息已经在上层抛出，详见 api.js 53 和 58 行
      // 这里不妨碍你针对这块业务继续自定义逻辑，比如跳回首页
    }).finally(onClose);
    console.log(
      `初始化或者地址栏参数变化会走到这里，你可以发起请求拿数据，然
      后调用 setState 或 dispatch 来更新 state/store，这里只是模拟了一下过程`
    );
  }, [params.id]);
  
  const onIncrement = () => {
    dispatch({
      type: 'dynamic/INCREMENT'
    });
  };
  const onDecrement = () => {
    dispatch({
      type: 'dynamic/DECREMENT'
    });
  };
  
  return (
    <div className={styles.Dynamic}>
      Dynamic： 动态参数为 { JSON.stringify(params) }
      <p><Button onClick={onSkip}>使用 hook 进行跳转</Button></p>
      <p>useReducer : {state.count}</p>
      <p>
        <Button onClick={onIncrement}>count++</Button>
        <Button onClick={onDecrement}>count--</Button>
      </p>
    </div>
  );
}