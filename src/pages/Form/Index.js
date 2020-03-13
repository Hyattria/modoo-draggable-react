import React from 'react';
import { Card, Form, Divider, Input } from 'antd';
import { connect } from 'dva';
import { isEmpty, find } from 'lodash';
import { renderComponentMap } from './Components/Index';

const inlineLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const setLayout = layout => (layout ? { ...inlineLayout } : '');

const FormList = props => {
  const [form] = Form.useForm();
  const {
    dispatch,
    preview: { previewData, seletedData },
  } = props;

  React.useEffect(() => {
    form.resetFields();
  }, [seletedData.uuid]);

  const onValuesChange = (changedValues, allValues) => {
    const payload = { ...seletedData };
    payload.propsValue = { ...allValues };
    console.log(payload);
    dispatch({
      type: 'preview/updatePreview',
      listData: previewData,
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
                <Form.Item
                  {...setLayout(config.layout)}
                  style={{
                    marginBottom: 12,
                    flexDirection: config.layout === 'horizontal' ? 'row' : 'column',
                  }}
                  name={name}
                  label={label}
                  rules={rules}
                >
                  {renderComponentMap[tag]({ ...detail })}
                </Form.Item>
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
