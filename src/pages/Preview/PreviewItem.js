import React, { useState } from 'react';
import styled from 'styled-components';
import { findIndex, once } from 'lodash';
import { connect } from 'dva';

const Wrap = styled.div`
  /* padding: 40px; */
  /* &:before {
    content: '';
    display: ${props => (props.showBefore ? 'block' : 'none')};
    height: 45px;
    background: repeating-linear-gradient(-140deg, #e6f7ff 0, #fff 1px, #58a 0, #1890ff 10px);
  } */

  transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
  padding-top: ${props => (props.showBefore ? '48px' : 0)};

  &:hover {
    border: 1px dashed #155bd4;
    content: '';
    box-sizing: border-box;
    z-index: 10;
    cursor: move;
  }
`;

const PreviewItem = (props, ref) => {
  const { component, propsValue, ...others } = props;
  const PreviewComponent = component;

  const [showBefore, setShowBefore] = useState(false);

  const { preview: { previewList } } = props;

  return (
    <Wrap
      showBefore={showBefore}
      ref={ref}
      {...others}
      onDragLeave={ev => {
        ev.preventDefault();
        // setShowBefore(false);
        // once(() => setShowBefore(false))();
        setShowBefore(false);
      }}
      onDragOver={ev => {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = 'move';

        setShowBefore(true);
      }}
    >
      <PreviewComponent {...propsValue} />
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
