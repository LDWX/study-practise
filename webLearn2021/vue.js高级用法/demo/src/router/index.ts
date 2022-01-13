import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

const List = () => import(/* webpackChunkName: "list" */ "../views/List.vue");
const Detail = () =>
    import(/* webpackChunkName: "detail" */ "../views/Detail.vue");

const Page1 = () =>
    import(/* webpackChunkName: "detail" */ "../views/Page-1.vue");

const Page2 = () =>
    import(/* webpackChunkName: "detail" */ "../views/Page-2.vue");

Vue.use(VueRouter);

const routes: RouteConfig[] = [
    {
        path: "/",
        name: 'home',
        component: Home,
        meta: {
            depth: 1
        }
    },
    {
        path: "/list",
        name: 'list',
        component: List,
        meta: {
            depth: 2
        }
    },
    {
        path: "/detail/:id",
        name: 'detail',
        component: Detail,
        meta: {
            depth: 3
        }
    },
    {
        path: "/page1",
        name: 'page1',
        component: Page1,
        meta: {
            depth: 2
        }
    },
    {
        path: "/page2",
        name: 'page2',
        component: Page2,
        meta: {
            depth: 2
        }
    }
];


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
