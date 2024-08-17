import { useGetLocale } from '@/locale';
import { Button, Form, message } from 'antd';
import React, { PropsWithChildren } from 'react';
import './style.less';
import { setResult } from '../result';

interface FormulaFormProps {
    initialValues?: Record<string, unknown>;
    title: string;
    description?: string | string[];
    request: (data: Record<string, unknown>) => Promise<void>;
}

const FormulaForm: React.FC<FormulaFormProps & PropsWithChildren> = (props) => {
    const { children, initialValues, title, description } = props;
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
                <h1 className='formula-form-title'>{title}</h1>
                {
                    description?.length &&
                    (
                        Array.isArray(description) ?
                            description.map((item, index) => <p className='formula-form-description' key={index}>{item}</p>)
                            :
                            <p className='formula-form-description'>{description}</p>
                    )
                }
                {children}
            </div>
        </div>
        <div className='formula-form-footer'>
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
    </Form>
}

export default FormulaForm;
