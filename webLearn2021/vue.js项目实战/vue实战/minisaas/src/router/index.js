import Vue from 'vue'
import Router from 'vue-router'
// 主逻辑模块
// 主要为了满足我们初始化入口的需求
import Main from '@/core/main'

Vue.use(Router)

// 家庭作业1： 尝试新增不同的站区，利用trunk将不同模块进行懒加载处理
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    }
  ]
})
