import React from 'react';
import { Radio, Tooltip } from 'antd';
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

  const label = React.useMemo(
    () => {
      return (
        find(items, ['value', value]) && find(items, ['value', value]).label
      );
    },
    // eslint-disable-next-line
    [value],
  );

  return (
    <Flex>
      <Label>{label}</Label>
      <Radio.Group
        buttonStyle="solid"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {items.map(item => (
          <Tooltip key={item.value} placement="bottom" title={label}>
            <Radio.Button value={item.value}>{item.icon}</Radio.Button>
          </Tooltip>
        ))}
      </Radio.Group>
    </Flex>
  );
};

export default React.memo(ButtonGroup);
