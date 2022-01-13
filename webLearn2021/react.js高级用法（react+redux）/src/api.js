import axios from 'axios';
import { message } from 'antd';

// https://www.npmjs.com/package/axios#example

const instance = axios.create({
  baseURL: '/api',
  timeout: 60000,
  headers: {
    withCredentials: true,
    'content-type': 'application/json;charset=utf-8'
  }
});

instance.interceptors.request.use(config => {
  if (config.data instanceof FormData) {
    Object.assign(config.headers, config.data.getHeaders());
  }
  return config;
});

instance.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data;
}, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

const create = urlStr => {
  if (typeof urlStr !== 'string') {
    throw new Error('创建请求的正确格式为 "method /url" 的形式，如 "get /news/detail" ');
  }
  const [method, url] = urlStr.trim().split(/\s+/);
  if (!method || !url) {
    throw new Error('缺少请求方式或 URL');
  }
  return (body = {}, opts) => { // opts 可以针对一次请求定义额外的配置项，如 headers 等，一般只用传第一个参数
    opts ||= {};
    const options = { url, method, ...opts };
    if (method.toLowerCase() === 'get') {
      options.params = body;
    } else {
      options.data = body;
    }
    return instance(options).then(res => {
      if (res.status === 'ok' || res.code === 200) { // 根据你自己的接口响应体判断
        return res.data; // 下文只要走到 then，拿到的就是 data 部分
      }
      if (res.message) { // 交互是成功的，但是业务角度上失败了，抛出服务端定义的消息
        message.error(res.message);
      }
      return Promise.reject(res);
    }).catch(err => {
      // 交互是失败的，还没走到业务处理
      message.error('网络或服务器错误，请稍后重试...');
      return Promise.reject(err);
    });
  };
}

export default create;
