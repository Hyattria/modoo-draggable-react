import React from 'react';
import styled from 'styled-components';
import {
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  FontSizeOutlined,
  BoldOutlined,
} from '@ant-design/icons';

const TextContainer = styled.div`
  position: relative;
  padding: 12px 8px;
  min-height: 32px;
  background-color: ${props => props.background};
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.color};
  text-align: ${props => props.align};
  font-size: ${props => props.size + 'px'};
  font-weight: ${props => props.weight};
`;

const Description = styled.div`
  color: ${props => props.color};
  font-size: 12px;
  margin-top: ${props => (props.desc ? '8px' : 0)};
  text-align: ${props => props.align};
  font-size: ${props => props.size + 'px'};
  font-weight: ${props => props.weight};
`;

const Text = props => {
  const {
    title,
    desc,
    align,
    title_size,
    desc_size,
    title_bold,
    desc_bold,
    title_color,
    desc_color,
    bg_color,
  } = props;

  return (
    <TextContainer background={bg_color}>
      <Title
        align={align}
        color={title_color}
        size={title_size}
        weight={title_bold}
      >
        {title}
      </Title>
      <Description
        align={align}
        color={desc_color}
        size={desc_size}
        weight={desc_bold}
      >
        {desc}
      </Description>
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
        { label: '居左显示', value: 'left', icon: <AlignLeftOutlined /> },
        { label: '居中显示', value: 'center', icon: <AlignCenterOutlined /> },
        { label: '居右显示', value: 'right', icon: <AlignRightOutlined /> },
      ],
    },
  },
  {
    name: 'title_size',
    tag: 'button-group',
    label: '标题大小',
    layout: 'horizontal',
    detail: {
      defaultValue: 16,
      items: [
        {
          label: '大 (16号)',
          value: 16,
          icon: <FontSizeOutlined style={{ fontSize: 16 }} />,
        },
        {
          label: '中 (14号)',
          value: 14,
          icon: <FontSizeOutlined style={{ fontSize: 14 }} />,
        },
        {
          label: '小 (12号)',
          value: 12,
          icon: <FontSizeOutlined style={{ fontSize: 12 }} />,
        },
      ],
    },
  },
  {
    name: 'desc_size',
    tag: 'button-group',
    label: '描述大小',
    layout: 'horizontal',
    detail: {
      defaultValue: 12,
      items: [
        {
          label: '大 (16号)',
          value: 16,
          icon: <FontSizeOutlined style={{ fontSize: 16 }} />,
        },
        {
          label: '中 (14号)',
          value: 14,
          icon: <FontSizeOutlined style={{ fontSize: 14 }} />,
        },
        {
          label: '小 (12号)',
          value: 12,
          icon: <FontSizeOutlined style={{ fontSize: 12 }} />,
        },
      ],
    },
  },
  {
    name: 'title_bold',
    tag: 'button-group',
    label: '标题粗细',
    layout: 'horizontal',
    detail: {
      defaultValue: 'bold',
      items: [
        {
          label: '常规体',
          value: 'normal',
          icon: <BoldOutlined style={{ fontSize: 14 }} />,
        },
        {
          label: '加粗体',
          value: 'bold',
          icon: <BoldOutlined style={{ fontSize: 16 }} />,
        },
      ],
    },
  },
  {
    name: 'desc_bold',
    tag: 'button-group',
    label: '描述粗细',
    layout: 'horizontal',
    detail: {
      defaultValue: 'normal',
      items: [
        {
          label: '常规体',
          value: 'normal',
          icon: <BoldOutlined style={{ fontSize: 14 }} />,
        },
        {
          label: '加粗体',
          value: 'bold',
          icon: <BoldOutlined style={{ fontSize: 16 }} />,
        },
      ],
    },
  },
  {
    name: 'title_color',
    tag: 'color-pick',
    label: '标题颜色',
    layout: 'horizontal',
    detail: {
      defaultValue: '#323233',
    },
  },
  {
    name: 'desc_color',
    tag: 'color-pick',
    label: '描述颜色',
    layout: 'horizontal',
    detail: {
      defaultValue: '#969799',
    },
  },
  {
    name: 'bg_color',
    tag: 'color-pick',
    label: '背景颜色',
    layout: 'horizontal',
    detail: {
      defaultValue: '#fff',
    },
  },
];

Text.title = '标题文本';

export default Text;
