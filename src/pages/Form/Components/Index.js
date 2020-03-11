import { Input } from 'antd';
import ButtonGroup from './ButtonGroup';

export const renderComponentMap = {
  input: props => <Input {...props} />,
  textarea: props => <Input.TextArea {...props} />,
  'button-group': props => <ButtonGroup {...props} />,
};