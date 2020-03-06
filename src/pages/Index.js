import React from 'react';
import { Layout, Menu } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';

import List from './List';
import Preview from './Preview';

import styled from 'styled-components';

const { Header, Sider, Content } = Layout;

const SiderMenu = styled(Menu)`
  height: 100%;
`;
const LightHeader = styled(Header)`
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
`;

// import Libs from './components/component-libs/index'
// import Preview from './Preview/Index'

export default props => (
  <React.Fragment>
    <LightHeader>前端微页面</LightHeader>
    <Layout>
      <Sider collapsed theme="light">
        <SiderMenu defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" title='组件列表'>
            <AppstoreAddOutlined />
            <span>组件列表</span>
          </Menu.Item>
        </SiderMenu>
      </Sider>
      <Sider theme="light" width={180}>
        <List />
      </Sider>
      <Content>
        <Preview />
      </Content>
      <Sider theme="light">Footer</Sider>
    </Layout>
  </React.Fragment>
);
