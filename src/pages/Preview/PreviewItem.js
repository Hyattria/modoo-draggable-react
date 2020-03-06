import React, { useState } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  /* padding: 40px; */
  &:before {
    content: '';
    display: ${props => (props.showBefore ? 'block' : 'none')};
    height: 45px;
    background: repeating-linear-gradient(-140deg, #e6f7ff 0, #fff 1px, #58a 0, #1890ff 10px);
  }

  &:hover {
    border: 1px dashed #155bd4;
    content: '';
    box-sizing: border-box;
    z-index: 10;
    cursor: move;
  }
`;

const PreviewItem = (data, ref) => {
  const { component, propsValue, ...others } = data;
  const PreviewComponent = component;

  const [showBefore, setShowBefore] = useState(false);

  return (
    <Wrap
      showBefore={showBefore}
      ref={ref}
      {...others}
      onDragLeave={ev => {
        ev.preventDefault();
        setShowBefore(false);
      }}
      onDragEnter={ev => {
        // ev.preventDefault();
        // ev.dataTransfer.dropEffect = 'move';
        // setShowBefore(true);
        console.log(333)
      }}
    >
      <PreviewComponent {...propsValue} />
    </Wrap>
  );
};

export default React.forwardRef(PreviewItem);
