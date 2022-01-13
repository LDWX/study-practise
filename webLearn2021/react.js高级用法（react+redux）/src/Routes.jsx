import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import Layout from '../layout';
import NoMatch from './NoMatch';

const About = lazy(() => import('./About'));
const Home = lazy(() => import('./Home'));
const Dynamic = lazy(() => import('./Dynamic'));
const Course = lazy(() => import('./Course'));

// react-router-dom v6 与 v5 差异 https://reactrouter.com/docs/en/v6/upgrading/v5
export default () => useRoutes([{
    path: '/',
    element: <Layout />,
    children: [{
      path: '/',
      element: <Home />
    }, {
      path: 'about',
      element: <About />
    }, {
      path: 'course',
      element: <Course />
    }, {
      path: 'dynamic',
      children: [{
        path: ':id',
        element: <Dynamic />
      }]
    }]
  }, {
    path: '*',
    element: <NoMatch />
  } 
]);