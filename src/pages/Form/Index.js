import React from 'react';
import { Card, Form, Divider } from 'antd';
import { connect } from 'dva';
import { isEmpty } from 'lodash';
import { renderComponentMap } from './Components/Index';
import styled from 'styled-components';

const inlineLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const setLayout = layout => (layout ? { ...inlineLayout } : '');

const FormItem = styled(Form.Item)`
  margin-bottom: 12px;
  label {
    color: ${props => props.horizontal && '#969799'};
  }
`;

const FormList = props => {
  const [form] = Form.useForm();
  const {
    dispatch,
    preview: { seletedData },
  } = props;

  React.useEffect(() => {
    form.resetFields();
  }, [seletedData.uuid]);

  const onValuesChange = (changedValues, allValues) => {
    const payload = { ...seletedData };
    payload.propsValue = { ...allValues };

    dispatch({
      type: 'preview/updatePreview',
      seletedData: payload,
    });
  };

  const { propsValue } = seletedData;

  return (
    <Card bordered={false} title={seletedData.title || '页面设置'}>
      <Form
        name="basic"
        form={form}
        initialValues={{ ...propsValue }}
        layout="vertical"
        onValuesChange={onValuesChange}
      >
        {!isEmpty(seletedData) &&
          seletedData.configs.map(config => {
            const { name, label, rules, tag, detail } = config;
            return (
              <React.Fragment key={name}>
                {config.divider && <Divider />}
                <FormItem
                  {...setLayout(config.layout)}
                  horizontal={config.layout === 'horizontal'}
                  style={{
                    flexDirection:
                      config.layout === 'horizontal' ? 'row' : 'column',
                  }}
                  name={name}
                  label={label}
                  rules={rules}
                >
                  {renderComponentMap[tag]({ ...detail })}
                </FormItem>
              </React.Fragment>
            );
          })}
      </Form>
    </Card>
  );
};

export default connect(({ preview }) => ({
  preview,
}))(FormList);
