import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import reactDOM from 'react-dom';
import { ConfigProvider, message } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import store from './core/store';
import Routes from './Routes';
import Loading from '@/component/Loading';
import 'antd/dist/antd.css';
import './global.css';

message.config({
  top: 50,
  duration: 2,
  maxCount: 1,
});

const render = () => reactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <Suspense fallback={<Loading />}>
          <Router>
            <Routes />
          </Router>
        </Suspense>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>,
  document.querySelector('#app')
);

render();

if (module.hot) {
  module.hot.accept('./Routes', () => {
    render();
  });
}
