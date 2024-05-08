import { useGetLocale } from '@/locale';
import FormulaForm from '@/pc/components/formula-form';
import NumberInput from '@/pc/components/number-input';
import show from '@/pc/components/result';
import { post } from '@/service';
import { Col, Form, Row, Statistic } from 'antd';
import React from 'react';

const Formula: React.FC = () => {
    const getLocale = useGetLocale('zzinnoveyes');
    return <FormulaForm
        title={getLocale('title')}
        description={getLocale('description')} initialValues={{
            refrectionb: -0.25,
            refrectionc: 0
        }}
        request={(data) => post({
            url: '/calculate/zzinnoveyes',
            data
        }).then((result: any) => {
            show(
                <Row gutter={16}>
                    <Col span={24}>
                        <h2>Treat</h2>
                    </Col>
                    <Col span={8}>
                        <Statistic title="Sph" value={result.treats} suffix="D" />
                    </Col>
                    <Col span={8}>
                        <Statistic title="Cyl" value={result.treatc} suffix="D" />
                    </Col>
                    <Col span={8}>
                        <Statistic title="Axis" value={result.treatax} />
                    </Col>
                    <Col span={24}>
                        <h2>Detail</h2>
                    </Col>
                    <Col span={8}>
                        <Statistic title="Sph" value={result.details} suffix="D" />
                    </Col>
                    <Col span={8}>
                        <Statistic title="Cyl" value={result.detailc} suffix="D" />
                    </Col>
                    <Col span={8}>
                        <Statistic title="Axis" value={result.detailax} />
                    </Col>
                </Row>
            )
        })}
    >
        <Form.Item noStyle dependencies={['manis']}>
            {({ getFieldValue, setFieldValue }) =>
                <Form.Item
                    name="age"
                    label="Age"
                    rules={[{ required: true }]}
                >
                    <NumberInput
                        onChange={(age) => {
                            if (age) {
                                const manis = getFieldValue('manis');
                                if (age >= 40) {
                                    setFieldValue('refrectiona', '-0.1')
                                } else if (age >= 25) {
                                    setFieldValue('refrectiona', (40 - age) * 0.025)
                                } else if (manis) {
                                    setFieldValue('refrectiona', (40 - age) * 0.025 - manis * 0.025)
                                }
                            }
                        }}
                    />
                </Form.Item>
            }
        </Form.Item>
        <Form.Item label="Mani" dependencies={['age']} required>
            {({ getFieldValue, setFieldValue }) =>
                <>
                    <Form.Item
                        noStyle
                        name="manis"
                        label="Mani Sph"
                        rules={[{ required: true }]}>
                        <NumberInput
                            placeholder='Sph'
                            suffix="D"
                            onChange={(manis) => {
                                const age = getFieldValue('age');
                                if (age) {
                                    if (age >= 40) {
                                        setFieldValue('refrectiona', -0.1)
                                    } else if (age >= 25) {
                                        setFieldValue('refrectiona', (40 - age) * 0.025)
                                    } else if (manis) {
                                        setFieldValue(
                                            'refrectiona',
                                            (40 - age) * 0.025 - manis * 0.025
                                        )
                                    }
                                }

                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        noStyle
                        name="manic"
                        label="Mani Cyl"
                        rules={[{ required: true }]}>
                        <NumberInput
                            placeholder='Cyl'
                            suffix="D"
                        />
                    </Form.Item>
                </>
            }
        </Form.Item>
        <Form.Item label="4mm" required>
            <Form.Item
                noStyle
                name="mms"
                label="4mm Sph"
                rules={[{ required: true }]}>
                <NumberInput placeholder='Sph' />
            </Form.Item>
            <Form.Item
                noStyle
                name="mmc"
                label="4mm Cyl"
                rules={[{ required: true }]}>
                <NumberInput placeholder='Cyl' />
            </Form.Item>
            <Form.Item
                noStyle
                name="mmax"
                label="4mm Axis"
                rules={[{ required: true }]}>
                <NumberInput placeholder='Axis' />
            </Form.Item>
        </Form.Item>
        <Form.Item label="Def-Detail" required>
            <Form.Item
                noStyle
                name="defdetails"
                label="Def-Detail Sph"
                rules={[{ required: true }]}>
                <NumberInput placeholder='Sph' />
            </Form.Item>
            <Form.Item
                noStyle
                name="defdetailc"
                label="Def-Detail Cyl"
                rules={[{ required: true }]}>
                <NumberInput placeholder='Cyl' />
            </Form.Item>
            <Form.Item
                noStyle
                name="defdetailax"
                label="Def-Detail Axis"
                rules={[{ required: true }]}>
                <NumberInput placeholder='Axis' />
            </Form.Item>
        </Form.Item>
        <Form.Item label="Target Refrection" required>
            <Form.Item
                noStyle
                name="refrectiona"
                label="Target Refrection Sph"
                rules={[{ required: true }]}>
                <NumberInput placeholder='Sph' precision={2} />
            </Form.Item>
            <Form.Item
                noStyle
                name="refrectionb"
                label="Target Refrection Cyl"
                rules={[{ required: true }]}>
                <NumberInput placeholder='Cyl' />
            </Form.Item>
            <Form.Item
                noStyle
                name="refrectionc"
                label="Target Refrection Axis"
                rules={[{ required: true }]}>
                <NumberInput placeholder='Axis' />
            </Form.Item>
        </Form.Item>
    </FormulaForm>
}


export default Formula;