import { auth } from '@/auth';
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

    async function onSubmit() {
        try {
            const formData = form.getFieldsValue();
            if (!formData.username) throw new Error('请输入用户名');
            if (!formData.password) throw new Error('请输入密码');
            await auth.signin(formData)
            login(null);
        } catch (err: any) {
            modal.info({
                centered: true,
                content: err.message,
                okText: '知道了'
            })
        }
    }

    return <div className='login-page'>
        {context}
        <div className='login-card'>
            <Form form={form} component={false}>
                <Form.Item name="username">
                    <Input className='login-input' prefix={<UserOutlined />} placeholder='请输入用户名' autoComplete="off" />
                </Form.Item>
                <Form.Item name="password">
                    <Input.Password className='login-input' prefix={<LockOutlined />} placeholder='请输入密码' autoComplete='off' />
                </Form.Item>
            </Form>
            <Button onClick={onSubmit} type='primary' block className='login-btn'>提交</Button>
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