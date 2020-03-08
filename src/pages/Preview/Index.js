import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'dva';
import { getConfigByType } from '@/components/index';
import { createUUID } from '@/utils/index';

import PreviewItem from './PreviewItem';
import styled from 'styled-components';

const Continer = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px 0;
  overflow: auto;
`;

const Wrap = styled.div`
  width: 375px;
  min-height: 780px;
  margin: 0 auto;
  position: relative;
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);
  background: #f7f8fa;
`;

const Header = styled.div`
  background-image: url(https://img.yzcdn.cn/public_files/2019/02/11/14417a76b49dac2851efaf744f87cdb4.png);
  height: 64px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  position: relative;
`;

const DropContainer = styled.div`
  min-height: 716px;
`;

@connect(({ preview }) => ({
  preview,
}))
class Preview extends React.PureComponent {
  updateComponent = ({ seletedData, listData }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'preview/updatePreview',
      seletedData,
      listData,
    });
  };

  onDrop = ev => {
    ev.preventDefault();
    ev.persist();

    const {
      preview: { previewData },
    } = this.props;

    const type = ev.dataTransfer.getData('type');

    const payload = {
      ...getConfigByType(type),
      uuid: createUUID(),
    };

    this.updateComponent({ seletedData: payload, listData: [...previewData, payload] });
  };

  render() {
    const {
      preview: { previewData },
    } = this.props;

    return (
      <Continer>
        <Wrap>
          <Header />
          <DropContainer onDrop={this.onDrop} onDragOver={ev => ev.preventDefault()}>
            <Droppable droppableId="droppable">
              {provided => {
                return (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {previewData.map((item, index) => {
                      const { uuid, render, title, propsValue } = item;
                      return (
                        <Draggable draggableId={uuid} key={uuid} index={index}>
                          {p => (
                            <PreviewItem
                              ref={p.innerRef}
                              {...p.draggableProps}
                              {...p.dragHandleProps}
                              propsValue={propsValue}
                              component={render}
                              uuid={uuid}
                              key={uuid}
                              title={title}
                            />
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </DropContainer>
        </Wrap>
      </Continer>
    );
  }
}

export default Preview;
