import { useGetLocale } from '@/locale';
import { LeftOutlined } from '@ant-design/icons';
import { Form as AntdForm, Button, SafeArea, Toast, type FormItemProps } from 'antd-mobile';
import React, { type PropsWithChildren } from 'react';
import { useNavigate } from 'react-router';
import './style.less';

interface FormProps {
    initialValues?: Record<string, number | any>;
    title: string;
    description: string | string[];
    request: (data: any) => Promise<void>;
}

const Form: React.FC<FormProps & PropsWithChildren> & { Item: typeof FormItem; Array: typeof AntdForm.Array } = (props) => {
    const { children, initialValues, title, description } = props;
    const [form] = AntdForm.useForm();
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
            <AntdForm
                form={form}
                className='formula-form'
                initialValues={initialValues}
                validateMessages={{
                    required: getLocale('required')
                }}>
                {children}
            </AntdForm>
        </div>
        <div className='formula-form-footer'>
            <Button block color='primary' onClick={onSubmit}>
                {getLocale('button')}
            </Button>
            <SafeArea position="bottom" />
        </div>
    </div>
}

const FormItem: React.FC<Omit<FormItemProps, 'required'>> = (props) => {
    return <AntdForm.Item {...props} required={false} />
}

Form.Item = FormItem;
Form.Array = AntdForm.Array

export default Form;
