import {
  baseUrl
} from '../../config/env.config.js'
import {formDataToJson} from '../../utils/form.js';
import * as es6Promise from 'es6-promise'
import 'isomorphic-fetch'

es6Promise.polyfill();

export default async(type = 'GET', url = '', data = {}) => {

  type = type.toUpperCase();
  url = baseUrl + url;

  if (type == 'GET') {
    let dataStr = ''; //数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&';
    })

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr;
    }
  }
  if (type == 'DELETE') {
    url = url + "/" + data.id;
  }

  let requestConfig = {
    credentials: 'include',
    method: type,
    headers: {
      'Accept': 'application/json',
      'Content-Type' : 'application/json'
    },
    mode: "cors",
    cache: "force-cache"
  }

  if (type == 'POST') {
    if (window.FormData && data instanceof FormData) {
      Object.defineProperty(requestConfig, 'body', {
        value: formDataToJson(data)
      })
    } else {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }

  }

  try {
    var response = await fetch(url, requestConfig);
    var responseJson = await response.json();
  } catch (error) {
    throw new Error(error)
  }
  return responseJson

}