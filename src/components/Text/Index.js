import React from 'react';
import styled from 'styled-components';

const TextContainer = styled.div`
  position: relative;
  padding: 12px 8px;
  min-height: 32px;
  background-color: #fff;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: rgb(50, 50, 51);
`;

const Description = styled.div`
  color: #8c8c8c;
  font-size: 12px;
  margin-top: 8px;
`;

const Text = props => {
  const { title, desc } = props;
  return (
    <TextContainer>
      <Title>{title}</Title>
      <Description>{desc}</Description>
    </TextContainer>
  );
};

Text.getPropsConfig = [
  {
    name: 'title',
    tag: 'Input',
    label: '标题内容',
    detail: {
      defaultValue: '',
      placeholder: '请输入标题',
    },
    rules: [{ required: true, message: '请输入标题' }],
  },
  {
    name: 'desc',
    tag: 'Input',
    label: '描述内容',
    detail: {
      defaultValue: '444',
    },
  }
];

Text.title = '标题文本';

export default Text;
