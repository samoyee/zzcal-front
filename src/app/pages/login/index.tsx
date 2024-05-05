import { auth } from '@/auth';
import { Button, Form, Input, Toast } from 'antd-mobile';
import React from 'react';
import { useNavigate, useSubmit } from 'react-router-dom';
import './style.less';

const Login: React.FC = () => {
    const login = useSubmit()
    const [form] = Form.useForm();
    const navigate = useNavigate();

    async function onSubmit() {
        try {
            const formData = form.getFieldsValue();
            if (!formData.username) throw new Error('请输入用户名');
            if (!formData.password) throw new Error('请输入密码');
            await auth.signin(formData)
            login(null);
        } catch (err: any) {
            Toast.show({
                icon: 'error',
                content: err.message,
            })
        }
    }

    return <div className='login-page'>
        <div className='login-card'>
            <Form form={form}>
                <Form.Item name="username">
                    <Input className='login-input' placeholder='请输入用户名' autoComplete="off" />
                </Form.Item>
                <Form.Item name="password">
                    <Input type='password' className='login-input' placeholder='请输入密码' autoComplete='off' />
                </Form.Item>
            </Form>
            <Button onClick={onSubmit} color='primary' block className='login-btn'>提交</Button>
            <div className='login-forget'>
                <a onClick={() => navigate("/forget")}>忘记密码？</a>
            </div>
            <div className='login-create-count'>
                <a onClick={() => navigate('/register')}>新建账号？</a>
            </div>
        </div>
    </div>;
}

export default Login;