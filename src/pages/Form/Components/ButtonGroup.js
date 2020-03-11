import React from 'react';
import { Radio } from 'antd';
import { Icon } from '@ant-design/compatible';
import { find } from 'lodash';

import styled from 'styled-components';

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

const ButtonGroup = props => {
  const { items, value, onChange } = props;

  const label = React.useMemo(() => {
    return find(items, ['value', value]) && find(items, ['value', value]).label;
  }, [value]);

  return (
    <Flex>
      <Label>{label}</Label>
      <Radio.Group value={value} onChange={e => onChange(e.target.value)}>
        {items.map(item => (
          <Radio.Button key={item.value} value={item.value}>
            <Icon type={item.icon} />
          </Radio.Button>
        ))}
      </Radio.Group>
    </Flex>
  );
};

export default React.memo(ButtonGroup);
