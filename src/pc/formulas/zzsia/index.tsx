import { useGetLocale } from '@/locale';
import FormulaForm from '@/pc/components/formula-form';
import NumberInput from '@/pc/components/number-input';
import show from '@/pc/components/result';
import { post } from '@/service';
import { Col, Form, Row, Statistic } from 'antd';
import React from 'react';

const Formula: React.FC = () => {
    const getLocale = useGetLocale('zzsia')
    return <FormulaForm
        title={getLocale('title')}
        description={getLocale('description')}
        request={(data) => post({
            url: '/calculate/zzsia',
            data
        }).then((result: any) => {
            show(
                <Row gutter={16}>
                    <Col span={8}>
                        <Statistic title="Sph" value={result.sph} suffix="D" />
                    </Col>
                    <Col span={8}>
                        <Statistic title="Cyl" value={result.cyl} suffix="D" />
                    </Col>
                    <Col span={8}>
                        <Statistic title="Axis" value={result.axis} />
                    </Col>
                </Row>
            )
        })}
    >
        <Form.Item label="Mani" required>
            <Form.Item
                noStyle
                name="maniSph"
                label="Mani Sph"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Sph' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="maniCyl"
                label="Mani Cyl"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Cyl' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="maniCylAxis"
                label="Mani Axis"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Axis' />
            </Form.Item>
        </Form.Item>
        <Form.Item
            name="siaD"
            label="SIA D"
            rules={[{ required: true }]}
        >
            <NumberInput />
        </Form.Item>
        <Form.Item
            name="siaAxis"
            label="SIA Axis"
            rules={[{ required: true }]}
        >
            <NumberInput />
        </Form.Item>
    </FormulaForm>
}

export default Formula;