import { useGetLocale } from '@/locale';
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Spin, message } from 'antd';
import React, { PropsWithChildren, useState } from 'react';
import './style.less';

interface FormulaFormProps {
    initialValues?: Record<string, unknown>;
    title: string;
    description?: string | string[];
    request: (data: Record<string, unknown>) => Promise<void>;
}

const FormulaForm: React.FC<FormulaFormProps & PropsWithChildren> = (props) => {
    const { children, initialValues, title, description } = props;
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const getLocale = useGetLocale('formula-form');
    const [msg, contextHolder] = message.useMessage();

    async function onSubmit() {
        try {
            const data = await form.validateFields();
            setLoading(true);
            await props.request(data);
            setLoading(false);
        } catch (err) {
            if (typeof err === 'string') {
                msg.error({ content: err, key: 'FORM_REQUEST_ERROR', duration: 2000 })
            }
            setLoading(false);
        }
    }

    return <>
        {contextHolder}
        <Spin wrapperClassName='formula-form-spin' spinning={loading} indicator={<Loading text={getLocale('loading')} />}>
            <h1 className='formula-form-title'>{title}</h1>
            <div className='formula-form-content'>
                {
                    description?.length &&
                    (
                        Array.isArray(description) ?
                            description.map((item, index) => <p className='formula-form-description' key={index}>{item}</p>)
                            :
                            <p className='formula-form-description'>{description}</p>
                    )
                }
                <Form
                    form={form}
                    className='formula-form'
                    initialValues={initialValues}
                    validateMessages={{
                        required: getLocale('required')
                    }}>
                    {children}
                </Form>
            </div>
            <div className='formula-form-footer'>
                <Button size='large' type='primary' onClick={onSubmit}>
                    {getLocale('button')}
                </Button>
            </div>
        </Spin>
    </>
}

export default FormulaForm;

const Loading: React.FC<{ text: string }> = ({ text }) => {
    return <div className='formula-loading'>
        <LoadingOutlined className='formula-loading-icon' spin />
        <div className='formula-loading-text'>{text}</div>
    </div>
}

