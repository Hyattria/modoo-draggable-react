import React, { useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { getConfigByType } from '@components/index';
import { createUUID } from '@/utils/index';
import { findIndex, find } from 'lodash';
import { connect } from 'dva';

import styled from 'styled-components';

const DeleteIcon = styled(DeleteOutlined)`
  display: none;
  cursor: pointer;
  position: absolute;
  left: -4px;
  width: 40px;
  height: 28px;
  background-size: 50%;
  background-repeat: no-repeat;
  background-color: #fff;
  background-position: center;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  font-size: 22px;
  align-items: center;
  justify-content: center;
`;

const WidgetName = styled.div`
  background-color: #fff;
  width: 80px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  font-size: 12px;
  pointer-events: none;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  position: relative;

  &::before {
    content: '';
    width: 0;
    height: 0;
    border-width: 5px;
    border-style: solid;
    border-color: transparent #fff transparent transparent;
    position: absolute;
    bottom: 7px;
    left: -10px;
  }
`;

const Wrap = styled.div`
  position: relative;
  transition: padding 0.2s cubic-bezier(0.2, 0, 0, 1);
  padding-top: ${props => (props.showBefore ? '48px' : 0)};

  &:hover {
    ::before {
      content: '';
      display: block;
      border: ${props => !props.actived && '1px dashed #155bd4'};
      width: ${props => !props.actived && '377px'};
      left: ${props => !props.actived && '-1px'};
    }

    ${DeleteIcon} {
      display: flex;
    }
    ${WidgetName} {
      display: none;
    }
  }

  &::before {
    content: '';
    display: ${props => (props.actived ? 'block' : 'none')};
    position: absolute;
    width: 379px;
    height: 100%;
    left: -2px;
    top: 0;
    box-sizing: border-box;
    border: 2px solid #155bd4;
    z-index: 10;
    cursor: move;
  }
`;

const Widget = styled.div`
  position: absolute;
  top: 0;
  right: -40px;
  width: 34px;
  cursor: pointer;
`;

const PreviewItem = (props, ref) => {
  const {
    uuid,
    dispatch,
    component,
    preview: { previewData, seletedData },
    ...others
  } = props;

  const PreviewComponent = component;

  const [showBefore, setShowBefore] = useState(false);

  const index = findIndex(previewData, ['uuid', uuid]);
  const propsValue = uuid === seletedData.uuid ? seletedData.propsValue : props.propsValue;

  const handleClick = () => {
    selectedComponent({ seletedData: { ...find(previewData, ['uuid', uuid]) } });
  };

  const selectedComponent = ({ seletedData, listData }) => {
    dispatch({
      type: 'preview/updatePreview',
      seletedData,
      listData,
    });
  };

  const updateComponent = (ev, isDelete = false) => {
    let payload = Array.from(previewData);

    if (!isDelete) {
      const type = ev.dataTransfer.getData('type');
      const data = {
        ...getConfigByType(type),
        uuid: createUUID(),
      };
      payload.splice(index, 0, { ...data });
      selectedComponent({ seletedData: { ...data }, listData: payload });
    } else {
      payload.splice(index, 1);
      selectedComponent({ seletedData: {}, listData: payload });
    }
  };

  return (
    <Wrap
      showBefore={showBefore}
      actived={uuid === seletedData.uuid}
      ref={ref}
      {...others}
      onClick={handleClick}
      onDragLeave={ev => {
        ev.preventDefault();
        ev.persist();
        showBefore && setShowBefore(false);
      }}
      onDrop={ev => {
        ev.stopPropagation();
        ev.persist();

        updateComponent(ev);
        setShowBefore(false);
      }}
      onDragOver={ev => {
        ev.preventDefault();
        ev.persist();
        !showBefore && setShowBefore(true);
      }}
    >
      <PreviewComponent {...propsValue} />
      <Widget>
        <DeleteIcon
          onClick={ev => {
            ev.stopPropagation();
            updateComponent(null, true);
          }}
        />
        <WidgetName>{props.title}</WidgetName>
      </Widget>
    </Wrap>
  );
};

export default connect(
  ({ preview }) => ({
    preview,
  }),
  null,
  null,
  { forwardRef: true },
)(React.forwardRef(PreviewItem));
