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
  text-align: ${props => props.align};
`;

const Description = styled.div`
  color: #8c8c8c;
  font-size: 12px;
  margin-top: ${props => props.desc ? '8px' : 0};
  text-align: ${props => props.align};
`;

const Text = props => {
  const { title, desc, align } = props;
  return (
    <TextContainer>
      <Title align={align}>{title}</Title>
      <Description align={align}>{desc}</Description>
    </TextContainer>
  );
};

Text.getPropsConfig = [
  {
    name: 'title',
    tag: 'input',
    label: '标题内容',
    detail: {
      defaultValue: '',
      placeholder: '请输入标题',
    },
    rules: [{ required: true, message: '请输入标题' }],
  },
  {
    name: 'desc',
    tag: 'textarea',
    label: '描述内容',
    detail: {
      defaultValue: '',
      placeholder: '请输入描述内容',
    },
  },
  {
    name: 'align',
    tag: 'button-group',
    label: '显示位置',
    divider: true,
    layout: 'horizontal',
    detail: {
      defaultValue: 'left',
      items: [
        { label: '居左显示', value: 'left', icon: 'pic-left' },
        { label: '居中显示', value: 'center', icon: 'pic-center' },
        { label: '居右显示', value: 'right', icon: 'pic-right' }
      ]
    }
  }
];

Text.title = '标题文本';

export default Text;
