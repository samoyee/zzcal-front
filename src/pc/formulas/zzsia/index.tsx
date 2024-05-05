import { Col, Form, Row, Statistic } from 'antd';
import React from 'react';
import NumberInput from '@/pc/components/number-input';
import FormulaForm from '@/pc/components/formula-form';
import { useGetLocale } from '@/locale';
import show from '@/pc/components/result';
import { post } from '@/service';

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
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='sph' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="maniCyl"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='cyl' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="maniCylAxis"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='axis' />
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