import React from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import { getConfigByType } from '@/components/index';
import { createUUID } from '@/utils/index';

import styled from 'styled-components';
import configList from './component-list';

const Container = styled.div`
  padding: 20px 12px 0;
`;

const Title = styled.div`
  font-size: 14px;
  color: #323233;
  margin-left: 10px;
  font-weight: 500;
`;

const Item = styled(Col)`
  margin: 15px 0 8px;
  padding: 15px 0;
  cursor: move;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:hover {
    background: #e6f7ff;
  }
`;

const ItemText = styled.div`
  color: #323233;
  line-height: 16px;
  margin-top: 10px;
  font-size: 13px;
`;

const List = props => {
  const { dispatch } = props;

  const addComponent = params => {
    const { type } = params;

    dispatch({
      type: 'preview/addComponent',
      payload: {
        ...getConfigByType(type),
        uuid: createUUID(),
      },
    });
  };

  const onDragStart = (ev, config)=> {
    console.log(1, config)
    ev.dataTransfer.setData('type', config.type);
  };

  return configList.map(config => (
    <Container key={config.title}>
      <Title>{config.title}</Title>
      <Row gutter={5}>
        {config.components.map(item => {
          const Icon = item.icon;
          return (
            <Item span={12} key={item.title} draggable onDragStart={ev => onDragStart(ev, item)}>
              <Icon style={{ color: '#323233', fontSize: 32 }} />
              <ItemText>{item.title}</ItemText>
            </Item>
          );
        })}
      </Row>
    </Container>
  ));
};

export default connect(({ preview, loading }) => ({
  preview,
  loading: loading.models.preview,
}))(List);
