import { Input } from 'antd';

import ButtonGroup from './ButtonGroup';
import ColorSketch from './ColorSketch';

export const renderComponentMap = {
  input: props => <Input {...props} />,
  textarea: props => <Input.TextArea {...props} />,
  'button-group': props => <ButtonGroup {...props} />,
  'color-pick': props => <ColorSketch {...props} />,
};
