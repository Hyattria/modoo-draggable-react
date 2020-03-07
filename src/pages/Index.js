import React from 'react';
import { Layout, Menu } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'dva';

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

const BasicLayout = props => {
  const onDropEnd = result => {
    const { source, destination } = result;
    const {
      preview: { previewList },
      dispatch,
    } = props;

    if (!destination) {
      return;
    }

    let payload = Array.from(previewList);
    const [remove] = payload.splice(source.index, 1);
    payload.splice(destination.index, 0, remove);

    dispatch({
      type: 'preview/setComponent',
      payload,
    });
  };

  return (
    <React.Fragment>
      <LightHeader>前端微页面</LightHeader>
      <DragDropContext onDragEnd={onDropEnd}>
        <Layout>
          <Sider collapsed theme="light">
            <SiderMenu defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" title="组件列表">
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
      </DragDropContext>
    </React.Fragment>
  );
};

export default connect(({ preview }) => ({
  preview,
}))(BasicLayout);
