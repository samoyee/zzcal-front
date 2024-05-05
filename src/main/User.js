import { DownOutlined, LockOutlined, QuestionCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Form, Input, Menu, message, Modal, Tabs, Tooltip } from 'antd';
import { login, logout, register } from "api/user";
import React, { Fragment, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from "react-redux";

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};

export default function User() {
    const intl = useIntl();
    const [activeTab, setActiveTab] = useState('login');
    const [form] = Form.useForm();
    const { visible, data: user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const onOpen = () => {
        dispatch({ type: '@User/OPEN_DIALOG' });
    }

    const onCancel = () => {
        dispatch({ type: '@User/CLOSE_DIALOG' });
    }

    const onSubmit = () => {
        form.validateFields()
            .then(async (formData) => {
                try {
                    const method = activeTab === "login" ? login : register;
                    const { data } = await method(formData);
                    if (data) {
                        dispatch({ type: "@User/LOGIN", user: data });
                        dispatch({ type: '@User/CLOSE_DIALOG' });
                        return;
                    }
                } catch (e) {
                    message.error(intl.formatMessage({ id: e.message }));
                }
            })
            .catch(() => { });
    }

    const onLogout = () => {
        logout().then(() => {
            dispatch({ type: "@User/LOGOUT" });
            window.location.reload();
        });
    }

    const onTabChange = (activeTab) => {
        setActiveTab(activeTab);
    };

    const FormItems = useMemo(() => {
        if (activeTab === "login") {
            return (
                <Fragment>
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: intl.formatMessage({
                                    id: "form.rules.required.username",
                                }),
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            autoComplete="off"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: intl.formatMessage({
                                    id: "form.rules.required.password",
                                }),
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            autoComplete="off"
                        />
                    </Form.Item>
                </Fragment>
            );
        }
        return (
            <Fragment>
                <Form.Item
                    {...formItemLayout}
                    name="username"
                    label={intl.formatMessage({ id: "form.field.username" })}
                    rules={[
                        {
                            required: true,
                            message: intl.formatMessage({
                                id: "form.rules.required.username",
                            }),
                        },
                    ]}
                >
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    name="password"
                    label={intl.formatMessage({ id: "form.field.password" })}
                    rules={[
                        {
                            required: true,
                            message: intl.formatMessage({
                                id: "form.rules.required.password",
                            }),
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    name="confirmPassword"
                    label={intl.formatMessage({ id: "form.field.confirmPassword" })}
                    dependencies={["password"]}
                    rules={[
                        {
                            required: true,
                            message: intl.formatMessage({
                                id: "form.rules.required.confirmPassword",
                            }),
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    intl.formatMessage({
                                        id: "form.rules.confirmPassword.different",
                                    })
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password autoComplete="off" />
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    name="nickname"
                    label={
                        <span>
                            {intl.formatMessage({ id: "form.field.nickname" })}&nbsp;
                            <Tooltip
                                title={intl.formatMessage({
                                    id: "form.field.nickname.tooltip",
                                })}
                            >
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </span>
                    }
                    rules={[
                        {
                            required: true,
                            message: intl.formatMessage({
                                id: "form.rules.required.nickname",
                            }),
                            whitespace: true,
                        },
                    ]}
                >
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    name="email"
                    label={intl.formatMessage({ id: "form.field.email" })}
                    rules={[
                        {
                            required: true,
                            message: intl.formatMessage({
                                id: "form.rules.required.email",
                            }),
                        },
                        {
                            type: "email",
                            message: intl.formatMessage({ id: "form.rules.email.valid" }),
                        },
                    ]}
                >
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    name="phone"
                    label={intl.formatMessage({ id: "form.field.phone" })}
                    rules={[
                        {
                            required: true,
                            message: intl.formatMessage({
                                id: "form.rules.required.phone",
                            }),
                        },
                    ]}
                >
                    <Input
                        addonBefore="+86"
                        style={{
                            width: "100%",
                        }}
                    />
                </Form.Item>
            </Fragment>
        );
    }, [activeTab]);

    const Component = useMemo(() => {
        return !user ?
            <Button type="link" onClick={onOpen}>{intl.formatMessage({ id: 'btn.login' })}</Button>
            :
            <Dropdown
                trigger={["click"]}
                overlay={
                    <Menu>
                        <Menu.Item>
                            <a onClick={onLogout}>
                                {intl.formatMessage({ id: 'btn.logout' })}
                            </a>
                        </Menu.Item>
                    </Menu>
                }
            >
                <Button type="link">
                    {user.nickname}
                    <DownOutlined />
                </Button>
            </Dropdown>
    }, [user]);

    return <Fragment>
        {Component}
        <Modal width={480}
            centered
            destroyOnClose
            visible={visible}
            onCancel={onCancel}
            onOk={onSubmit}
            maskClosable={false}>
            <Tabs activeKey={activeTab} onChange={onTabChange}>
                <Tabs.TabPane tab={intl.formatMessage({ id: 'btn.login' })} key="login" />
                <Tabs.TabPane tab={intl.formatMessage({ id: 'btn.register' })} key="register" />
            </Tabs>
            <Form form={form}>{FormItems}</Form>
        </Modal>
    </Fragment>
}