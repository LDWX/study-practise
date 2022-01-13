import React from 'react';
import Login from '@/pages/login';
import User from '@/pages/user';
import NotFound from '@/pages/notFound';



export default [{
  type:'redirect',
  exact:true,
  from:'/',
  to:'/user'
},{
  type:'route',
  path:'/user',
  exact:true,
  component:User
},{
  type:'route',
  path:'/login',
  exact:true,
  component:Login
},{
  type:'route',
  path:'*',
  //将component替换成render
  render:({staticContext})=>{
    if (staticContext) staticContext.NOT_FOUND = true;
    return <NotFound/>
  }
}]