import { auth } from '@/auth';
import { useGetLocale } from '@/locale';
import { Button, Form, Input, Toast } from 'antd-mobile';
import React from 'react';
import { useNavigate, useSubmit } from 'react-router-dom';
import './style.less';

const Login: React.FC = () => {
    const login = useSubmit()
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const getLocale = useGetLocale('login');

    async function onSubmit() {
        try {
            const formData = form.getFieldsValue();
            if (!formData.username) throw new Error(getLocale('usernameRequired'));
            if (!formData.password) throw new Error(getLocale('passwordRequired'));
            await auth.signin(formData)
            login(null);
        } catch (err) {
            Toast.show({
                icon: 'fail',
                content: (err as Error).message,
            })
        }
    }

    return <div className='login-page'>
        <div className='login-card'>
            <div className='login-title'>{getLocale("loginTitle")}</div>
            <div className='login-subtitle'>{getLocale("loginSubTitle")}</div>
            <Form form={form}>
                <Form.Item name="username" className='login-form-item'>
                    <Input className='login-input' placeholder={getLocale('usernameRequired')} autoComplete="off" />
                </Form.Item>
                <Form.Item name="password" className='login-form-item'>
                    <Input type='password' className='login-input' placeholder={getLocale('passwordRequired')} autoComplete='off' />
                </Form.Item>
            </Form>
            <Button onClick={onSubmit} color='primary' block className='login-btn'>{getLocale('loginBtn')}</Button>
            <div className='login-create-count'>
                <a onClick={() => navigate('/zzcal/register')}>{getLocale('createBtn')}</a>
            </div>
        </div>
    </div>;
}

export default Login;