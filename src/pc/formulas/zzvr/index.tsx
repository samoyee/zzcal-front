import { useGetLocale } from '@/locale';
import DataChart from '@/pc/components/chart';
import FormulaForm from '@/pc/components/formula-form';
import NumberInput from '@/pc/components/number-input';
import show from '@/pc/components/result';
import { post } from '@/service';
import { Col, Form, Row, Select, Statistic } from 'antd';
import React from 'react';

const { Option } = Select;

const Formula: React.FC = () => {
    const getLocale = useGetLocale('zzvr');
    return <FormulaForm
        title={getLocale('title')}
        description={getLocale('description')}
        initialValues={{ opicZone: 6.5, version: '1.1' }}
        request={(data) => post({
            url: '/calculate/formulavr',
            data
        }).then((result: any) => {
            show(
                <Row>
                    <Col span={12}>
                        <Row gutter={16}>
                            <Col span={24}>
                                <h2>VR</h2>
                            </Col>
                            <Col span={8}>
                                <Statistic title="Sph" value={result.vrSph} suffix="D" />
                            </Col>
                            <Col span={8}>
                                <Statistic title="Cyl" value={result.vrCyl} suffix="D" />
                            </Col>
                            <Col span={8}>
                                <Statistic title="Axis" value={result.vrAxis} />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <DataChart
                            data={[
                                [result.maniCyl, result.maniAxis, "Manifest Astigmatism"],
                                [result.comaCyl, result.comaAxis, "COMA Astigmatism"],
                                [result.secAstiD2, result.secAstiD3, "Secondary Astigmatism"],
                                [result.vrCyl, result.vrAxis, "VR"],
                            ]}
                        />
                    </Col>
                </Row>
            )
        })}
    >
        <Form.Item name="version" label="Version">
            <Select style={{ width: 100 }}>
                <Option value="1.0">v 1.0</Option>
                <Option value="1.1">v 1.1</Option>
            </Select>
        </Form.Item>
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