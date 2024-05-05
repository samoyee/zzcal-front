import { Col, Form, Row, Select, Statistic } from 'antd';
import React from 'react';
import NumberInput from '@/pc/components/number-input';
import FormulaForm from '@/pc/components/formula-form';
import { useGetLocale } from '@/locale';
import show from '@/pc/components/result';
import { post } from '@/service';
import DataChart from '@/pc/components/chart';

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
            <Select>
                <Option value="1.0">v 1.0</Option>
                <Option value="1.1">v 1.1</Option>
            </Select>
        </Form.Item>
        <Form.Item name="opicZone" label="Opic Zone">
            <NumberInput suffix="mm" />
        </Form.Item>
        <Form.Item name="c7" label="C7">
            <NumberInput suffix="μm" />
        </Form.Item>
        <Form.Item name="c8" label="C8">
            <NumberInput suffix="μm" />
        </Form.Item>
        <Form.Item name="c11" label="C11">
            <NumberInput suffix="μm" />
        </Form.Item>
        <Form.Item name="c12" label="C12">
            <NumberInput suffix="μm" />
        </Form.Item>
        <Form.Item name="c13" label="C13">
            <NumberInput suffix="μm" />
        </Form.Item>
        <Form.Item label="Mani" required>
            <Form.Item noStyle name="maniSph">
                <NumberInput placeholder='sph' suffix="D" />
            </Form.Item>
            <Form.Item noStyle name="maniCyl">
                <NumberInput placeholder='cyl' suffix="D" />
            </Form.Item>
            <Form.Item noStyle name="maniCylAxis">
                <NumberInput placeholder='axis' />
            </Form.Item>
        </Form.Item>
    </FormulaForm>
}

export default Formula;