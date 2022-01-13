import React from 'react';
import reactDOM from 'react-dom';
import App from './App';
import MobxReact from './MobxReact';
import { Provider } from 'mobx-react';
import store from './store';

const render = () => reactDOM.render(
  <Provider {...store}>
    <MobxReact />
  </Provider>,
  document.querySelector('#app')
);

render();

if (module.hot) {
  module.hot.accept('./App', () => {
    render();
  });
}
