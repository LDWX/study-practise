import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);


export enum RoutePath {
    /** 首页 */
    Index = '/',
    /** 关于页面 */
    About = '/about',
    /** 用户页面 */
    User = '/user',
}

const routes: RouteConfig[] = [
  {
    path: RoutePath.Index,
    component: Home,
  },
  {
    path: RoutePath.About,
    component: () => import('../views/About.vue'),
  },
  {
    path: RoutePath.User,
    component: () => import('../views/User.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});


export default router;
