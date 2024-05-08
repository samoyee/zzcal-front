import { useGetLocale } from '@/locale';
import FormulaForm from '@/pc/components/formula-form';
import NumberInput from '@/pc/components/number-input';
import show from '@/pc/components/result';
import { post } from '@/service';
import { Col, Form, Row, Statistic } from 'antd';
import React from 'react';

const Formula: React.FC = () => {
    const getLocale = useGetLocale('zztoriciol')
    return <FormulaForm
        title={getLocale('title')}
        description={getLocale('description')}
        initialValues={{
            targetSe: 0,
            cct: 500,
            lt: 5,
        }}
        request={(data) => post({
            url: '/calculate/zzcaltoriciol',
            data
        }).then((result: any) => {
            show(
                <Row gutter={16}>
                    <Col span={24}>
                        <h2>IOL</h2>
                    </Col>
                    <Col span={6}>
                        <Statistic title="SE" value={result.iolSe} suffix="D" />
                    </Col>
                    <Col span={6}>
                        <Statistic title="Sph" value={result.iolS} suffix="D" />
                    </Col>
                    <Col span={6}>
                        <Statistic title="Cyl" value={result.iolC} suffix="D" />
                    </Col>
                    <Col span={6}>
                        <Statistic title="Axis" value={result.iolAx} />
                    </Col>
                </Row>
            )
        })}
    >
        <Form.Item
            name="aConstant"
            label="A Constant"
            rules={[{ required: true }]}
        >
            <NumberInput />
        </Form.Item>
        <Form.Item
            name="targetSe"
            label="Target SE"
            rules={[{ required: true }]}
        >
            <NumberInput suffix="D" />
        </Form.Item>
        <Form.Item
            name="al"
            label="AL"
            rules={[{ required: true }]}
        >
            <NumberInput suffix="mm" />
        </Form.Item>
        <Form.Item
            name="acd"
            label="ACD"
            rules={[{ required: true }]}
        >
            <NumberInput suffix="mm" />
        </Form.Item>
        <Form.Item
            name="lt"
            label="LT"
            rules={[{ required: true }]}
        >
            <NumberInput suffix="mm" />
        </Form.Item>
        <Form.Item
            name="meanpp"
            label="Mean PP"
            rules={[{ required: true }]}
        >
            <NumberInput suffix="D" />
        </Form.Item>
        <Form.Item
            name="cornAsti"
            label="Corn Asti"
            rules={[{ required: true }]}
        >
            <NumberInput suffix="D" max={0} />
        </Form.Item>
        <Form.Item
            name="cornAstiAx"
            label="Corn Asti Ax"
            rules={[{ required: true }]}
        >
            <NumberInput />
        </Form.Item>
        <Form.Item
            name="sia"
            label="SIA"
            rules={[{ required: true }]}
        >
            <NumberInput suffix="D" />
        </Form.Item>
        <Form.Item
            name="siaAx"
            label="SIA AX"
            rules={[{ required: true }]}
        >
            <NumberInput />
        </Form.Item>
        <Form.Item
            name="cct"
            label="CCT"
            rules={[{ required: true }]}
        >
            <NumberInput suffix="μm" />
        </Form.Item>
    </FormulaForm>
}

export const title = 'ZZ TIOL'

export const description = "Selection of Toric IOL (Intra-ocula Lens) for normal cornea to calculate the Toric IOL refraction and axis"

export function getInitialValues() {
    return {
        targetSe: 0,
        cct: 500,
        lt: 5,
    }
}

export default Formula;