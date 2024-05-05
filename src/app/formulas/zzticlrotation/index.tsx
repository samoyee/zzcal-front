import FormulaForm from '@/app/components/formula-form';
import NumberInput from '@/app/components/number-input';
import Stats from '@/app/components/statistic';
import { useGetLocale } from '@/locale';
import show from '@/app/components/result';
import { post } from '@/service';
import { Form, List } from 'antd-mobile';
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
                <List>
                    <List.Item extra={
                        <Stats value={result.clockwise} />
                    }>Clockwise</List.Item>
                    <List.Item extra={
                        <>
                            <Stats title="Sph" value={result.estimatedS} suffix="D" />
                            <Stats title="Cyl" value={result.estimatedC} suffix="D" />
                            <Stats.Divider />
                            <Stats title="Axis" value={result.estimatedAx} />
                        </>
                    }>Estimated</List.Item>
                </List>
            )
        })}
    >
        <Form.Item label="Mani">
            <Form.Item
                noStyle
                name="maniS"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Sph' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="maniC"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Cyl' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="maniAx"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Axis' />
            </Form.Item>
        </Form.Item>
        <Form.Item label="Residual">
            <Form.Item
                noStyle
                name="resiSph"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Sph' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="resiCyl"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Cyl' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="resiCylAxis"
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