import React from 'react';

import styled from 'styled-components';

const TextContainer = styled.div`
  position: relative;
  padding: 12px 8px;
  background-color: #fff;
`;

const Text = props => {
  const { title } = props;
  return <TextContainer>{title}</TextContainer>;
};

Text.getConfigProps = [
  {
    name: 'title',
    tag: 'Input',
    label: '标题内容',
    detail: {
      defaultValue: '1112',
      placeholder: '请输入标题',
    },
    rules: [{ required: true, message: '请输入标题' }],
  },
];

export default Text;
