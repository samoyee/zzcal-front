import FormulaForm from '@/app/components/formula-form';
import NumberInput from '@/app/components/number-input';
import show from '@/app/components/result';
import Stats from '@/app/components/statistic';
import { useGetLocale } from '@/locale';
import { post } from '@/service';
import { Form, List, } from 'antd-mobile';
import React from 'react';

const Formula: React.FC = () => {
    const getLocale = useGetLocale('zziclvault')
    return <FormulaForm
        title={getLocale('title')}
        description={getLocale('description')}
        initialValues={{ lt: 4 }}
        request={(data) => post({
            url: '/calculate/zziclvault',
            data
        }).then((result: any) => {
            show(
                <List>
                    <List.Item extra={
                        <Stats value={result.estiVault} suffix="mm" />
                    }>Esti Vault</List.Item>
                </List>
            )
        })}
    >
        <Form.Item
            name="lt"
            label="LT"
            rules={[{ required: true }]}
        >
            <NumberInput suffix="mm" />
        </Form.Item>
        <Form.Item
            name="stsh"
            label="STS-H"
            rules={[{ required: true }]}
        >
            <NumberInput suffix="mm" />
        </Form.Item>
        <Form.Item
            name="stsv"
            label="STS-V"
            rules={[{ required: true }]}
        >
            <NumberInput suffix="mm" />
        </Form.Item>
        <Form.Item
            name="iclSize"
            label="ICL Size"
            rules={[{ required: true }]}
        >
            <NumberInput suffix="mm" />
        </Form.Item>
        <Form.Item
            name="iclAx"
            label="ICL Ax"
            rules={[
                { required: true },
                { type: 'number', min: 0, max: 180 }
            ]}
        >
            <NumberInput suffix="mm" min={0} max={180} />
        </Form.Item>
    </FormulaForm>
}

export default Formula;