import { auth } from '@/auth';
import { Button, Form, Input, Toast } from 'antd-mobile';
import React from 'react';
import { useNavigate, useSubmit } from 'react-router-dom';
import './style.less';

const Register: React.FC = () => {
    const register = useSubmit()
    const [form] = Form.useForm();
    const navigate = useNavigate();

    async function onSubmit() {
        try {
            const formData = form.getFieldsValue();
            if (!formData.username) throw new Error('请输入用户名');
            if (!formData.password) throw new Error('请输入密码');
            await auth.register(formData)
            register(null);
        } catch (err: any) {
            Toast.show({
                icon: 'error',
                content: err.message,
            })
        }
    }

    return <div className='register-page'>
        <div className='register-card'>
            <Form form={form} layout="vertical">
                <Form.Item name="username" label="用户名" required>
                    <Input className='register-input' autoComplete="off" />
                </Form.Item>
                <Form.Item name="password" label="密码" required>
                    <Input type='password' className='register-input' autoComplete='off' />
                </Form.Item>
                <Form.Item name="confirmPassword" label="确认密码" required>
                    <Input type='password' className='register-input' autoComplete='off' />
                </Form.Item>
                <Form.Item name="nickname" label="姓名">
                    <Input className='register-input' autoComplete='off' />
                </Form.Item>
                <Form.Item name="email" label="邮箱">
                    <Input className='register-input' autoComplete='off' />
                </Form.Item>
                <Form.Item name="phone" label="电话">
                    <Input className='register-input' autoComplete='off' />
                </Form.Item>
            </Form>
            <Button onClick={onSubmit} color='primary' block className='register-btn'>注册</Button>
            <div className='register-forget'>
                <a onClick={() => navigate("/login")}>返回登录</a>
            </div>
        </div>
    </div>;
}

export default Register;