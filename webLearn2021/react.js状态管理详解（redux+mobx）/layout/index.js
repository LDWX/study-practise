import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import styles from './style.less';

const { Header, Sider, Content } = Layout;

export default function BaseLayout() {
  const { pathname } = useLocation();
  return (
    <Layout theme="light" className={styles.Layout}>
      <Menu theme="light" mode="horizontal" selectedKeys={[pathname]}>
        <Menu.Item key="/"><Link to="/">home</Link></Menu.Item>
        <Menu.Item key="/about"><Link to="/about">about</Link></Menu.Item>
        <Menu.Item key="/course"><Link to="/course">course</Link></Menu.Item>
      </Menu>
      <Layout>
        <Sider className={styles.Sider} theme="light">
          <span>当前环境: { _DEV_ ? 'development' : 'production' }</span>
        </Sider>
        <Content className={styles.Content}><Outlet /></Content>
      </Layout>
    </Layout>
    
  );
}
