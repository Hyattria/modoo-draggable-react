import React, { useState } from 'react';
import { Button } from 'antd';
import { SketchPicker } from 'react-color';
import styled from 'styled-components';

const Picker = styled.div`
  padding: 5px;
  background: #fff;
  margin-right: 2px;
  border-radius: 1px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
`;

const Color = styled.div`
  width: 38px;
  height: 18px;
  border-radius: 2px;
  background: ${props => props.color};
`;

const Popover = styled.div`
  position: absolute;
  z-index: 2;
  right: 0;
  bottom: 40px;
`;

const Cover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #323233;
  line-height: 18px;
  margin-right: 16px;
`;

const ColorSketch = props => {
  const { value, onChange } = props;

  const [visible, setVisible] = useState(false);
  const [defaultColor] = useState(value); // 默认值

  return (
    <Flex>
      <Label>{value}</Label>
      <div>
        <Button
          style={{ verticalAlign: 'middle' }}
          type="link"
          onClick={() => onChange(defaultColor)}
        >
          重置
        </Button>
        <Picker onClick={() => setVisible(!visible)}>
          <Color color={value} />
        </Picker>
        {visible ? (
          <Popover>
            <Cover onClick={() => setVisible(false)} />
            <SketchPicker
              color={value}
              onChangeComplete={color => onChange(color.hex)}
            />
          </Popover>
        ) : null}
      </div>
    </Flex>
  );
};

export default ColorSketch;
