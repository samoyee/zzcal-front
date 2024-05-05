import { useGetLocale } from '@/locale';
import { Button, Form, SafeArea, Toast } from 'antd-mobile';
import React, { type PropsWithChildren } from 'react';
import './style.less';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

interface FormulaFormProps {
    initialValues?: Record<string, number | any>;
    title: string;
    description: string | string[];
    request: (data: any) => Promise<void>;
}

const FormulaForm: React.FC<FormulaFormProps & PropsWithChildren> = (props) => {
    const { children, initialValues, title, description } = props;
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const getLocale = useGetLocale('formula-form');

    async function onSubmit() {
        try {
            const data = await form.validateFields();
            Toast.show({ icon: 'loading', content: '计算中...' })
            await props.request(data);
            Toast.clear();
        } catch (err) {
            Toast.clear();
        }
    }

    return <div className='formula-form-wrapper'>
        <h1 className='formula-form-title'>
            <LeftOutlined className='formula-form-back' onClick={() => navigate(-1)} />
            {title}
        </h1>
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
            <Button block color='primary' onClick={onSubmit}>
                {getLocale('button')}
            </Button>
            <SafeArea position="bottom" />
        </div>
    </div>
}

export default FormulaForm;

