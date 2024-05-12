import Form from '@/app/components/formula-form';
import NumberInput from '@/app/components/number-input';
import show from '@/app/components/result';
import Stats from '@/app/components/statistic';
import { useGetLocale } from '@/locale';
import { post } from '@/service';
import { List } from 'antd-mobile';
import React from 'react';

const Formula: React.FC = () => {
    const getLocale = useGetLocale('zzticlrotation');
    return <Form
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
                    }>{result.type}</List.Item>
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
        <Form.Item label="Residual">
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
    </Form>
}

export default Formula;