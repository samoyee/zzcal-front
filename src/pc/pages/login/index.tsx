import { auth } from '@/auth';
import { useGetLocale } from '@/locale';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd';
import React from 'react';
import { useNavigate, useSubmit } from 'react-router-dom';
import './style.less';

const Login: React.FC = () => {
    const login = useSubmit()
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [modal, context] = Modal.useModal();
    const getLocale = useGetLocale('login');

    async function onSubmit() {
        try {
            const formData = form.getFieldsValue();
            if (!formData.username) throw new Error(getLocale('usernameRequired'));
            if (!formData.password) throw new Error(getLocale('passwordRequired'));
            await auth.signin(formData)
            login(null);
        } catch (err: unknown) {
            if (err instanceof Error)
                modal.info({
                    centered: true,
                    type: 'info',
                    title: err.message,
                    okText: getLocale('okBtn')
                })
        }
    }

    return <div className='login'>
        {context}
        <div className='login-card'>
            <Form form={form} component={false}>
                <Form.Item name="username">
                    <Input className='login-input' prefix={<UserOutlined />} placeholder={getLocale('usernameRequired')} autoComplete="off" />
                </Form.Item>
                <Form.Item name="password" extra={
                    <div className='login-forget'>
                        {/* <a onClick={() => navigate("/forget")}>{getLocale('forgetBtn')}</a> */}
                    </div>
                }>
                    <Input.Password className='login-input' prefix={<LockOutlined />} placeholder={getLocale('passwordRequired')} autoComplete='off' />
                </Form.Item>
            </Form>
            <Button onClick={onSubmit} type='primary' block className='login-btn'>{getLocale('loginBtn')}</Button>
            <div className='login-add'>
                <a onClick={() => navigate('/register')}>{getLocale('createBtn')}</a>
            </div>
        </div>
    </div>;
}

export default Login;