import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
  addComponent = type => {
    const { dispatch } = this.props;
    dispatch({
      type: 'preview/addComponent',
      payload: {
        ...getConfigByType(type),
        uuid: createUUID(),
      },
    });
  };

  setComponent = payload => {
    const { dispatch } = this.props;
    dispatch({
      type: 'preview/setComponent',
      payload,
    });
  };

  onDrop = ev => {
    const type = ev.dataTransfer.getData('type');
    this.addComponent(type);
  };

  onDropEnd = result => {
    const { source, destination } = result;
    const {
      preview: { previewList },
    } = this.props;

    if (!destination) {
      return;
    }

    let arr = Array.from(previewList);
    const [remove] = arr.splice(source.index, 1);
    arr.splice(destination.index, 0, remove);

    this.setComponent(arr);
  };

  render() {
    const {
      preview: { previewList },
    } = this.props;

    return (
      <DragDropContext onDragEnd={this.onDropEnd}>
        <Continer>
          <Wrap>
            <Header />
            <DropContainer onDrop={this.onDrop} onDragOver={ev => ev.preventDefault()}>
              <Droppable droppableId="droppable">
                {provided => {
                  return (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {previewList.map((item, index) => {
                        const { uuid, render, propsValue } = item;
                        return (
                          <Draggable draggableId={uuid} key={uuid} index={index}>
                            {p => (
                              <PreviewItem
                                ref={p.innerRef}
                                {...p.draggableProps}
                                {...p.dragHandleProps}
                                propsValue={propsValue}
                                component={render}
                                key={uuid}
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
      </DragDropContext>
    );
  }
}

export default Preview;
