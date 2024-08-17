import { useGetLocale } from '@/locale';
import { Button, Form, message, Popover } from 'antd';
import React, { PropsWithChildren } from 'react';
import { setResult } from '../result';
import './style.less';
import { NumberOutlined } from '@ant-design/icons';

interface FormulaFormProps {
  initialValues?: Record<string, unknown>;
  title: string;
  warning?: string;
  description?: string | string[];
  request: (data: Record<string, unknown>) => Promise<void>;
}

const FormulaForm: React.FC<FormulaFormProps & PropsWithChildren> = (props) => {
  const { children, initialValues, title, description, warning } = props;
  const [form] = Form.useForm();
  const getLocale = useGetLocale('formula-form');
  const [msg, contextHolder] = message.useMessage();

  async function onSubmit() {
    try {
      const data = await form.validateFields();
      await props.request(data);
    } catch (err) {
      if (typeof err === 'string') {
        msg.error({ content: err, key: 'FORM_REQUEST_ERROR', duration: 2000 })
      }
    }
  }

  return <Form
    form={form}
    className='formula-form'
    initialValues={initialValues}
    validateMessages={{
      required: getLocale('required')
    }}>
    {contextHolder}
    <div className='formula-form-scroll'>
      <div className='formula-form-content'>
        <div className='formula-form-title'>
          <span>{title}</span>
          {
            description?.length &&
            <Popover placement="bottom" content={
              <div className='formula-form-description'>
                {
                  description?.length &&
                  (
                    Array.isArray(description) ?
                      description.map((item, index) => <p key={index}>{item}</p>)
                      :
                      <p>{description}</p>
                  )
                }
              </div>
            }>
              <span className='formula-form-more'><NumberOutlined />说明</span>
            </Popover>
          }
        </div>
        {children}
      </div>
    </div>
    <div className='formula-form-footer'>
      {warning && <div className='formula-form-warning'>*{warning}</div>}
      <div className='formula-form-btn'>
        <Button size='large' onClick={() => {
          form.resetFields()
          setResult(null);
        }}>
          {getLocale('clear')}
        </Button>
        <Button size='large' type='primary' onClick={onSubmit}>
          {getLocale('button')}
        </Button>
      </div>
    </div>
  </Form>
}

export default FormulaForm;
