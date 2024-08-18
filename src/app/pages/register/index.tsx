import { auth } from '@/auth';
import { useGetLocale, useLocale } from '@/locale';
import { Button, Form, Input, Toast } from 'antd-mobile';
import React, { useEffect } from 'react';
import { useNavigate, useSubmit } from 'react-router-dom';
import './style.less';
import { ZzcalError } from '@/error';
import Select from '@/app/components/select';

const Register: React.FC = () => {
    const register = useSubmit()
    const [form] = Form.useForm();
    const navigate = useNavigate();
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
            const formData = form.getFieldsValue();
            if (!formData.username) throw new Error(getLocale('accountRequired'));
            if (!formData.lastname || !formData.firstname) throw new Error(getLocale('nameRequired'));
            if (!formData.email) throw new Error(getLocale('emailRequired'));
            if (!/^([A-Za-z0-9_\-\\.])+@([A-Za-z0-9_\-\\.])+\.([A-Za-z]{2,})$/.test(formData.email)) throw new Error(getLocale('emailPatternError'))
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
                const error = err.error as Record<string, { errors: string[] }>;
                const fields = Object.keys(error)
                    .map(key => ({
                        name: key,
                        errors: error[key].errors,
                    }))
                form.setFields(fields);
            }
            if (err instanceof Error) {
                Toast.show({
                    icon: 'fail',
                    content: err.message,
                })
            }
        }
    }

    return <div className='register-page'>
        <Form form={form} layout="vertical">
            <Form.Item name="username" label={getLocale('accountLabel')} required>
                <Input
                    className='register-input'
                    placeholder={getLocale('accountRequired')}
                    autoComplete="off"
                    onChange={() => {
                        form.setFields([
                            {
                                name: 'username',
                                errors: []
                            }
                        ])
                    }}
                />
            </Form.Item>
            <Form.Item label={getLocale('nameLabel')} required className='register-group'>
                {
                    locale === 'zhCN' ?
                        <>
                            <Form.Item noStyle name="lastname">
                                <Input className='register-input register-group-input' autoComplete='off' placeholder={getLocale('lastNameLabel')} />
                            </Form.Item>
                            <Form.Item noStyle name="firstname">
                                <Input className='register-input register-group-input' autoComplete='off' placeholder={getLocale('firstNameLabel')} />
                            </Form.Item>
                        </>
                        :
                        <>
                            <Form.Item noStyle name="firstname">
                                <Input className='register-input register-group-input' autoComplete='off' placeholder={getLocale('firstNameLabel')} />
                            </Form.Item>
                            <Form.Item noStyle name="lastname">
                                <Input className='register-input register-group-input' autoComplete='off' placeholder={getLocale('lastNameLabel')} />
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
                    className='register-input'
                    options={window.countrys}
                    fieldNames={{
                        label: {
                            'zhCN': 'country_name_cn',
                            'enUS': 'country_name_en'
                        }[locale],
                        value: 'country_name_cn',
                    }}
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
                    return <Form.Item name="phone" label={getLocale('phoneLabel')} help={!country ? getLocale('countryRequired') : undefined}>
                        <Input
                            // help={!country ? getLocale('countryRequired') : undefined}
                            className='register-input'
                            // addonBefore={country ? `+${country}` : undefined}
                            autoComplete='off'
                            placeholder={getLocale('phonePlaceholder')}
                        />
                    </Form.Item>
                }}
            </Form.Item>
            <Form.Item name="institution" label={getLocale('institutionLabel')} required>
                <Input className='register-input' autoComplete='off' placeholder={getLocale('institutionRequired')} />
            </Form.Item>
            <Form.Item name="password" help={getLocale('passwordRuleContent')} label={getLocale('passwordLabel')} required>
                <Input type='password' className='register-input' autoComplete='off' placeholder={getLocale('passwordRequired')} />
            </Form.Item>
            <Form.Item name="confirmPassword" help={getLocale('confirmPasswordRuleContent')} label={getLocale('confirmPasswordLabel')} required>
                <Input type="password" className='register-input' autoComplete='off' placeholder={getLocale('confirmPasswordPlaceholder')} />
            </Form.Item>
        </Form>
        <Button onClick={onSubmit} color='primary' block className='register-btn'>{getLocale('registerBtn')}</Button>
        <div className='register-back'>
            <a onClick={() => navigate("/login")}>{getLocale('backBtn')}</a>
        </div>
    </div>;
}

export default Register;