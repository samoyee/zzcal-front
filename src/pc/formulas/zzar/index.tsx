import { useGetLocale } from '@/locale';
import DataChart from '@/pc/components/chart';
import FormulaForm from '@/pc/components/formula-form';
import NumberInput from '@/pc/components/number-input';
import show from '@/pc/components/result';
import { post } from '@/service';
import { Col, Form, Radio, Row, Statistic } from 'antd';
import React from 'react';

const Formula: React.FC = () => {
    const getLocale = useGetLocale('zzar');
    return <FormulaForm
        title={getLocale('title')}
        description={getLocale('description')}
        initialValues={{
            mode: 'not',
            resLensC: 20,
        }}
        request={(data) => post({
            url: '/calculate/zzar2',
            data
        })
            .then((result: any) => {
                show(
                    <Row>
                        <Col span={12}>
                            <Row gutter={16}>
                                <Col span={24}>
                                    <h2>AR</h2>
                                </Col>
                                <Col span={8}>
                                    <Statistic title="Sph" value={result.arSph} suffix="D" />
                                </Col>
                                <Col span={8}>
                                    <Statistic title="Cyl" value={result.arCyl} suffix="D" />
                                </Col>
                                <Col span={8}>
                                    <Statistic title="Axis" value={result.arAxis} />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <DataChart
                                data={[
                                    [result.hoAsC, result.hoAsA, "HOAs Astigmatism"],
                                    [result.corneaC, result.corneaA, "Corneal Astigmatism"],
                                    [result.lensC, result.lensA, "Lens Astigmatism"],
                                    [result.arCyl, result.arAxis, "AR"],
                                ]}
                            />
                        </Col>
                    </Row>
                )
            })}
    >
        <Form.Item name="mode" extra={getLocale('selector')}>
            <Radio.Group>
                <Radio value="available">{getLocale('yes')}</Radio>
                <Radio value="not">{getLocale("no")}</Radio>
            </Radio.Group>
        </Form.Item>
        <Form.Item label="Mani" required>
            <Form.Item
                noStyle
                name="maniSph"
                label="Sph"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Sph' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="maniCyl"
                label="Cyl"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Cyl' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="maniCylAxis"
                label="Axis"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Axis' />
            </Form.Item>
        </Form.Item>
        <Form.Item
            name="kf"
            label="Kf"
            rules={[{ required: true }]}
        >
            <NumberInput suffix="D" />
        </Form.Item>
        <Form.Item
            name="ks"
            label="Ks"
            rules={[
                { required: true },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (getFieldValue("kf") > value) {
                            return Promise.reject("Ks >= Kf");
                        }
                        return Promise.resolve();
                    },
                }),
            ]}
        >
            <NumberInput suffix="D" />
        </Form.Item>
        <Form.Item
            name="kf2"
            label="Kf Ax"
            rules={[{ required: true }]}
        >
            <NumberInput />
        </Form.Item>
        <Form.Item noStyle dependencies={['mode']}>
            {({ getFieldValue }) =>
                getFieldValue('mode') === 'available' &&
                <>
                    <Form.Item label="Corn-P" required>
                        <Form.Item
                            noStyle
                            name="cornPC"
                            rules={[{ required: true }]}
                        >
                            <NumberInput placeholder='Cyl' suffix="D" />
                        </Form.Item>
                        <Form.Item
                            noStyle
                            name="cornPAx"
                            rules={[{ required: true }]}
                        >
                            <NumberInput placeholder='Axis' />
                        </Form.Item>
                    </Form.Item>
                </>}
        </Form.Item>
        <Form.Item label="TMR" required>
            <Form.Item
                noStyle
                name="tmrc"
                label="TMR Cyl"
                rules={[
                    { required: true },
                    { type: 'number', max: 0 }
                ]}
            >
                <NumberInput placeholder='Cyl' suffix="D" max={0} />
            </Form.Item>
            <Form.Item
                noStyle
                name="tmra"
                label="TMR Axis"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Axis' />
            </Form.Item>
        </Form.Item>
        <Form.Item
            name="resLensC"
            label="Res-Lens C"
            rules={[{ required: true }]}
        >
            <NumberInput suffix="%" />
        </Form.Item>
    </FormulaForm>
}

export default Formula;