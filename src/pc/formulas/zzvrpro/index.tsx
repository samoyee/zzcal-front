import { useGetLocale } from '@/locale';
import FormulaForm from '@/pc/components/formula-form';
import NumberInput from '@/pc/components/number-input';
import show from '@/pc/components/result';
import { post } from '@/service';
import { Col, Form, Row, Statistic } from 'antd';
import React from 'react';

const Formula: React.FC = () => {
    const getLocale = useGetLocale('zzvrpro')
    return <FormulaForm
        title={getLocale('title')}
        description={getLocale('zzvrpro')}
        request={(data) => post({
            url: '/calculate/formulavrpro',
            data
        }).then((result: any) => {
            show(
                <Row gutter={16}>
                    <Col span={24}>
                        <h2>Correct</h2>
                    </Col>
                    <Col span={8}>
                        <Statistic title="Sph" value={result.correctSph} suffix="D" />
                    </Col>
                    <Col span={8}>
                        <Statistic title="Cyl" value={result.correctCyl} suffix="D" />
                    </Col>
                    <Col span={8}>
                        <Statistic title="Axis" value={result.correctCylAxis} />
                    </Col>
                </Row>
            )
        })}
    >
        <Form.Item name="opicZone" label="Opic Zone" rules={[{ required: true }]}>
            <NumberInput suffix="mm" />
        </Form.Item>
        <Form.Item name="c7" label="C7" rules={[{ required: true }]}>
            <NumberInput suffix="μm" />
        </Form.Item>
        <Form.Item name="c8" label="C8" rules={[{ required: true }]}>
            <NumberInput suffix="μm" />
        </Form.Item>
        <Form.Item name="c11" label="C11" rules={[{ required: true }]}>
            <NumberInput suffix="μm" />
        </Form.Item>
        <Form.Item name="c12" label="C12" rules={[{ required: true }]}>
            <NumberInput suffix="μm" />
        </Form.Item>
        <Form.Item name="c13" label="C13" rules={[{ required: true }]}>
            <NumberInput suffix="μm" />
        </Form.Item>
        <Form.Item label="Mani" required>
            <Form.Item noStyle name="maniSph" label="Mani Sph" rules={[{ required: true }]}>
                <NumberInput placeholder='Sph' suffix="D" />
            </Form.Item>
            <Form.Item noStyle name="maniCyl" label="Mani Cyl" rules={[{ required: true }]}>
                <NumberInput placeholder='Cyl' suffix="D" />
            </Form.Item>
            <Form.Item noStyle name="maniCylAxis" label="Mani Axis" rules={[{ required: true }]}>
                <NumberInput placeholder='Axis' />
            </Form.Item>
        </Form.Item>
    </FormulaForm>
}

export default Formula;