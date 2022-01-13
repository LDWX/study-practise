import axios from 'axios'
import Vue from 'vue'
import '../../mock/server'
import { safteyInterceptor } from './safteyInterceptor'
import { wrapError } from './wrapError'

// 上报
window.trace = function (key, value) {
  console.log('trace is ', key, value)
}

if (!Vue.prototype.$ajax) {
  // 当前网络处于初始化阶段

  // 独立抽象安全性拦截器
  axios.interceptors.request.use(safteyInterceptor)

  const CSRF_KEY = '_csrf'

  // 模拟一下后台注入cookie过程
  const cMAP = {
    _csrf: 'foiwjoefjiowjf',
    _token: '75489732975978439'
  }

  let lastRequestSettings = []

  axios.interceptors.request.use(function (config) {
    window.trace('request', Date.now())

    // 加上csrf_key
    let csrf = cMAP[CSRF_KEY]
    if (csrf) {
      switch (config.method) {
        case 'get':
        case 'delete':
        case 'options':
        case 'head':
          config.params = config.params || {}
          config.params[CSRF_KEY] = csrf
          break
        case 'post':
        case 'put':
        case 'patch':
          config.data = config.data || {}
          if (typeof config.data === 'string') {
            let str = config.data

            try {
              config.data = JSON.parse(str)
            } catch (e) {
              config.data = str
            }
          }
          config.data[CSRF_KEY] = csrf
          break
        default:
          break
      }
    }
    return config
  })

  axios.interceptors.response.use(function (res) {
    return res.data
  }, function (error) {
    // let url = error && error.config && error.config.url

    // 模块化我们的告警错误处理
    error = wrapError(error, lastRequestSettings)
  })

  // 继续上一次的请求
  // 家庭作业： 登录后重新继续上次请求
  axios.goon = function () {
    // lastRequestSettings
  }

  Vue.prototype.$ajax = axios
}

export default Vue.prototype.$ajax
