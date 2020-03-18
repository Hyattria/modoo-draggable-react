import React from 'react';
import { Layout, Menu } from 'antd';
import { FormatPainterOutlined } from '@ant-design/icons';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'dva';

import Header from './Header/Index';
import List from './List/Index';
import Preview from './Preview/Index';
import FormList from './Form/Index';

import styled from 'styled-components';

const { Sider, Content } = Layout;

const SiderMenu = styled(Menu)`
  height: 100%;
`;
const LightHeader = styled(Layout.Header)`
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
`;

const BasicLayout = props => {
  const onDropEnd = result => {
    const { source, destination } = result;
    const {
      preview: { previewData },
      dispatch,
    } = props;

    if (!destination) {
      return;
    }

    let payload = Array.from(previewData);
    const [remove] = payload.splice(source.index, 1);
    payload.splice(destination.index, 0, remove);

    dispatch({
      type: 'preview/setComponent',
      payload,
    });
  };

  return (
    <React.Fragment>
      <LightHeader>
        <Header />
      </LightHeader>
      <DragDropContext onDragEnd={onDropEnd}>
        <Layout>
          <Sider collapsed theme="light">
            <SiderMenu defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" title="组件列表">
                <FormatPainterOutlined />
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
          <Sider theme="light" width={375}>
            <FormList />
          </Sider>
        </Layout>
      </DragDropContext>
    </React.Fragment>
  );
};

export default connect(({ preview }) => ({
  preview,
}))(BasicLayout);
