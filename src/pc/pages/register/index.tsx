import { auth } from '@/auth';
import { useGetLocale, useLocale } from '@/locale';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputProps, Modal, Popover, Select, Tooltip } from 'antd';
import React, { PropsWithChildren, useEffect } from 'react';
import { useNavigate, useSubmit } from 'react-router-dom';
import './style.less';
import { ZzcalError } from '@/error';

const Register: React.FC = () => {
    const register = useSubmit()
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [modal, context] = Modal.useModal();
    const getLocale = useGetLocale('register');
    const [locale] = useLocale();

    useEffect(() => {
        if (locale === 'zhCN') {
            form.setFieldsValue({
                country: '中国'
            })
        }
    }, [locale])

    async function onSubmit() {
        try {
            const formData = await form.validateFields();
            if (!formData.username) throw new Error(getLocale('accountRequired'));
            if (!formData.lastname || !formData.firstname) throw new Error(getLocale('nameRequired'));
            if (!formData.email) throw new Error(getLocale('emailRequired'));
            if (!/^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(formData.email)) throw new Error(getLocale('emailPatternError'))
            if (!formData.country) throw new Error(getLocale('countryRequired'));
            if (!formData.institution) throw new Error(getLocale('institutionRequired'));
            if (formData.phone && !/\d{8,}/.test(formData.phone)) throw new Error(getLocale('phonePatternError'));
            if (!formData.password) throw new Error(getLocale('passwordRequired'));
            if (formData.password.length < 6 || formData.password.length > 20) throw new Error(getLocale('passwordLenError'));
            if (formData.confirmPassword !== formData.password) throw new Error(getLocale('confirmPasswordError'));

            await auth.register(formData)
            register(null);
        } catch (err) {
            if (err instanceof ZzcalError) {
                const error = err.error;
                const fields = Object.keys(error)
                    .map(key => ({
                        name: key,
                        errors: error[key].errors,
                    }))
                form.setFields(fields);
            }
            if (err instanceof Error) {
                modal.info({
                    centered: true,
                    type: 'info',
                    content: err.code,
                    okText: getLocale('okBtn')
                })
            }
        }
    }

    return <div className='register'>
        {context}
        <div className='register-card'>
            <Form form={form} colon={false} initialValues={{}}>
                <Form.Item name="username" label={getLocale('accountLabel')} required>
                    <Input
                        className='register-input'
                        autoComplete="off"
                        placeholder={getLocale('accountRequired')}
                        onChange={() => {
                            form.setFields([
                                {
                                    name: 'username',
                                    errors: []
                                }
                            ])
                        }} />
                </Form.Item>
                <Form.Item label={getLocale('nameLabel')} required className='register-group'>
                    {
                        locale === 'zhCN' ?
                            <>
                                <Form.Item noStyle name="lastname">
                                    <Input className='register-input' autoComplete='off' placeholder={getLocale('lastNameLabel')} />
                                </Form.Item>
                                <Form.Item noStyle name="firstname">
                                    <Input className='register-input' autoComplete='off' placeholder={getLocale('firstNameLabel')} />
                                </Form.Item>
                            </>
                            :
                            <>
                                <Form.Item noStyle name="firstname">
                                    <Input className='register-input' autoComplete='off' placeholder={getLocale('firstNameLabel')} />
                                </Form.Item>
                                <Form.Item noStyle name="lastname">
                                    <Input className='register-input' autoComplete='off' placeholder={getLocale('lastNameLabel')} />
                                </Form.Item>
                            </>
                    }
                </Form.Item>
                <Form.Item name="email" label={getLocale('emailLabel')} required>
                    <Input className='register-input' autoComplete='off' placeholder={getLocale('emailRequired')} />
                </Form.Item>
                <Form.Item name="country" label={getLocale('countryLabel')} required>
                    <Select
                        placeholder={getLocale('countryRequired')}
                        className='register-select'
                        options={window.countrys}
                        fieldNames={{
                            label: {
                                'zhCN': 'country_name_cn',
                                'enUS': 'country_name_en'
                            }[locale],
                            value: 'country_name_cn',
                        }}
                        showSearch
                        optionFilterProp="countrys"
                        filterOption={(input, option) => {
                            return option?.ab === input
                                || option?.country_name_cn.includes(input)
                                || option?.country_name_en === input;
                        }}
                    />
                </Form.Item>
                <Form.Item noStyle dependencies={['country']}>
                    {({ getFieldValue }) => {
                        const country = window.countryMap[getFieldValue('country')] || '';
                        return <Form.Item name="phone" label={getLocale('phoneLabel')}>
                            <HelpInput
                                help={!country ? getLocale('countryRequired') : undefined}
                                className='register-input'
                                addonBefore={country ? `+${country}` : undefined}
                                autoComplete='off'
                                placeholder={getLocale('phonePlaceholder')}
                            />
                        </Form.Item>
                    }}
                </Form.Item>
                <Form.Item name="institution" label={getLocale('institutionLabel')} required>
                    <Input className='register-input' autoComplete='off' placeholder={getLocale('institutionRequired')} />
                </Form.Item>
                <Form.Item name="password" label={<HelpLabel
                    title={getLocale('passwordRuleTitle')}
                    content={getLocale('passwordRuleContent')}>{getLocale('passwordLabel')}</HelpLabel>} required>
                    <Input.Password className='register-input' autoComplete='off' placeholder={getLocale('passwordRequired')} />
                </Form.Item>
                <Form.Item name="confirmPassword" label={<HelpLabel title={getLocale('confirmPasswordRuleTitle')} content={getLocale('confirmPasswordRuleContent')}>{getLocale('confirmPasswordLabel')}</HelpLabel>} required>
                    <Input.Password className='register-input' autoComplete='off' placeholder={getLocale('confirmPasswordPlaceholder')} />
                </Form.Item>
            </Form>
            <Button onClick={onSubmit} type='primary' className='register-btn'>{getLocale('registerBtn')}</Button>
            <div className='register-back'>
                <a onClick={() => navigate("/login")}>{getLocale('backBtn')}</a>
            </div>
        </div>
    </div>;
}

export default Register;

interface HelpInputProps extends InputProps {
    help?: string;
}

const HelpInput: React.FC<HelpInputProps> = (props) => {
    const { help, ...restProps } = props;
    return <Tooltip overlay={help} placement="topLeft" trigger={['focus']}>
        <Input {...restProps} />
    </Tooltip>
}

interface HelpLabelProps {
    title: string;
    content: string[];
}

const HelpLabel: React.FC<HelpLabelProps & PropsWithChildren> = (props) => {
    return <span className='help-label'>
        {props.children}
        <Popover
            overlayClassName='help-label-overlay'
            placement='left'
            title={props.title}
            content={<ul>
                {props.content?.map((item, index) => <li key={index}>{item}</li>)}
            </ul>}>
            <QuestionCircleOutlined className='help-label-icon' />
        </Popover>
    </span>
}