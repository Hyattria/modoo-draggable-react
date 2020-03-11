import React from 'react';
import { Input, Button } from 'antd';

// 渲染对应的表单控件
export const renderMap = {
  input: props => <Input {...props} />,
  textarea: props => <Input.TextArea {...props} />,
};
