import { useGetLocale } from '@/locale';
import FormulaForm from '@/pc/components/formula-form';
import NumberInput from '@/pc/components/number-input';
import show from '@/pc/components/result';
import { post } from '@/service';
import { Col, Form, Row, Statistic } from 'antd';
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
                <Row gutter={16}>
                    <Col span={24}>
                        <h2>Esti Vault</h2>
                    </Col>
                    <Col span={24}>
                        <Statistic value={result.estiVault} suffix="mm" />
                    </Col>
                </Row>
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