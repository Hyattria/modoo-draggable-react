import React from 'react';
import { Card, Form, Input, Button, Checkbox } from 'antd';
import { connect } from 'dva';
import { isEmpty, find } from 'lodash';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const FormList = props => {
  const {
    dispatch,
    preview: { seletedData },
  } = props;

  const [form] = Form.useForm();

  React.useEffect(() => {
    form.resetFields();
  }, [form, seletedData.uuid]);

  const onValuesChange = (changedValues, allValues) => {
    const payload = { ...seletedData };
    payload.propsValue = { ...allValues };

    dispatch({
      type: 'preview/setSeletedData',
      payload,
    });
  };

  const { propsValue } = seletedData

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
            const { name, label, rules } = config;
            return (
              <Form.Item
                style={{ marginBottom: 12 }}
                key={config.name}
                name={name}
                label={label}
                rules={rules}
              >
                <Input />
              </Form.Item>
            );
          })}
      </Form>
    </Card>
  );
};

export default connect(({ preview }) => ({
  preview,
}))(FormList);
