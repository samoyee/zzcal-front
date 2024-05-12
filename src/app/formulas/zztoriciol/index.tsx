import Form from '@/app/components/formula-form';
import NumberInput from '@/app/components/number-input';
import show from '@/app/components/result';
import Stats from '@/app/components/statistic';
import { useGetLocale } from '@/locale';
import { post } from '@/service';
import { List } from 'antd-mobile';
import React from 'react';

const Formula: React.FC = () => {
    const getLocale = useGetLocale('zztoriciol')
    return <Form
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
                <List>
                    <List.Item extra={<Stats value={result.iolSe} suffix='D' />}>IOL SE</List.Item>
                    <List.Item extra={
                        <>
                            <Stats title="Sph" value={result.iolS} suffix="D" />
                            <Stats title="Cyl" value={result.iolC} suffix="D" />
                            <Stats.Divider />
                            <Stats title="Axis" value={result.iolAx} />
                        </>
                    }>IOL</List.Item>
                </List>
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
    </Form>
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