import api from '@/api';

export const getDynamicData = api('get /dynamic/list');

/* 如果某次请求需要自定义请求头，可以像下面这样：

getDynamicData(paramObj, {
  ...
  headers: {} 这里的配置会覆盖 api.js 文件的基础配置
});
*/