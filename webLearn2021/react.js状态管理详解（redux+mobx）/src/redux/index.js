import React from 'react';
import reactDOM from 'react-dom';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';

const render = () => reactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#app')
);

render();

if (module.hot) {
  module.hot.accept('./App', () => {
    render();
  });
}


// react-redux:
/* 
const ReduxContext = createContext();

const Provider = ReduxContext.Provider;
const connect ...

export {
  Provider, connect
} */