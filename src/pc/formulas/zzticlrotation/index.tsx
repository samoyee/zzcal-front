import { useGetLocale } from '@/locale';
import FormulaForm from '@/pc/components/formula-form';
import NumberInput from '@/pc/components/number-input';
import show from '@/pc/components/result';
import { post } from '@/service';
import { Col, Form, Row, Statistic } from 'antd';
import React from 'react';

const Formula: React.FC = () => {
    const getLocale = useGetLocale('zzticlrotation');
    return <FormulaForm
        title={getLocale('title')}
        description={getLocale('description')}
        request={(data) => post({
            url: '/calculate/zzticl',
            data
        }).then((result: any) => {
            show(
                <Row gutter={16}>
                    <Col span={24}>
                        <h2>Clockwise</h2>
                    </Col>
                    <Col span={8}>
                        <Statistic value={result.clockwise} />
                    </Col>
                    <Col span={24}>
                        <h2>Estimated</h2>
                    </Col>
                    <Col span={8}>
                        <Statistic title="Sph" value={result.estimatedS} suffix="D" />
                    </Col>
                    <Col span={8}>
                        <Statistic title="Cyl" value={result.estimatedC} suffix="D" />
                    </Col>
                    <Col span={8}>
                        <Statistic title="Axis" value={result.estimatedAx} />
                    </Col>
                </Row>
            )
        })}
    >
        <Form.Item label="Mani" required>
            <Form.Item
                noStyle
                name="maniS"
                label="Mani Sph"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Sph' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="maniC"
                label="Mani Cyl"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Cyl' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="maniAx"
                label="Mani Axis"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Axis' />
            </Form.Item>
        </Form.Item>
        <Form.Item label="Residual" required>
            <Form.Item
                noStyle
                name="resiSph"
                label="Residual Sph"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Sph' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="resiCyl"
                label="Residual Cyl"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Cyl' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="resiCylAxis"
                label="Residual Axis"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Axis' />
            </Form.Item>
        </Form.Item>
        <Form.Item
            name="siaD"
            label="SIA"
            rules={[{ required: true }]}
        >
            <NumberInput suffix="D" />
        </Form.Item>
        <Form.Item
            name="siaAxis"
            label="SIA Ax"
            rules={[{ required: true }]}
        >
            <NumberInput />
        </Form.Item>
    </FormulaForm>
}

export default Formula;