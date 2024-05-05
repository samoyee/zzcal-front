import { Col, Form, Row, Statistic } from 'antd';
import React from 'react';
import NumberInput from '@/pc/components/number-input';
import FormulaForm from '@/pc/components/formula-form';
import { useGetLocale } from '@/locale';
import show from '@/pc/components/result';
import { post } from '@/service';
import DataChart from '@/pc/components/chart';

const Formula: React.FC = () => {
    const getLocale = useGetLocale('zzvectorsumandsub');
    return <FormulaForm
        title={getLocale('title')}
        description={getLocale('description')}
        request={(data) => post({
            url: '/calculate/zzastigmatism',
            data
        }).then((result: any) => {
            show(
                <Row>
                    <Col span={12}>
                        <Row gutter={16}>
                            <Col span={24}>
                                <h2>A + B</h2>
                            </Col>
                            <Col span={8}>
                                <Statistic title="Sph" value={result.sph1add2} suffix="D" />
                            </Col>
                            <Col span={8}>
                                <Statistic title="Cyl" value={result.cyl1add2} suffix="D" />
                            </Col>
                            <Col span={8}>
                                <Statistic title="Axis" value={result.axis1add2} />
                            </Col>
                            <Col span={24}>
                                <h2>A - B</h2>
                            </Col>
                            <Col span={8}>
                                <Statistic title="Sph" value={result.sph1cut2} suffix="D" />
                            </Col>
                            <Col span={8}>
                                <Statistic title="Cyl" value={result.cyl1cut2} suffix="D" />
                            </Col>
                            <Col span={8}>
                                <Statistic title="Axis" value={result.axis1cut2} />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <DataChart
                            data={[
                                [data.cyl1, data.axis1, "A"],
                                [data.cyl2, data.axis2, "B"],
                                [result.cyl1add2, result.axis1add2, "A + B"],
                                [result.cyl1cut2, result.axis1cut2, "A - B"],
                            ]}
                        />
                    </Col>
                </Row>

            )
        })}
    >
        <Form.Item label="A" required>
            <Form.Item
                noStyle
                name="sph1"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Sph' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="cyl1"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Cyl' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="axis1"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Axis' />
            </Form.Item>
        </Form.Item>
        <Form.Item label="B" required>
            <Form.Item
                noStyle
                name="sph2"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Sph' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="cyl2"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Cyl' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="axis2"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Axis' />
            </Form.Item>
        </Form.Item>
    </FormulaForm>
}

export default Formula;