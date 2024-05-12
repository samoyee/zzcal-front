import Form from '@/app/components/formula-form';
import NumberInput from '@/app/components/number-input';
import show from '@/app/components/result';
import Stats from '@/app/components/statistic';
import { useGetLocale } from '@/locale';
import { post } from '@/service';
import { List } from 'antd-mobile';
import React from 'react';

const Formula: React.FC = () => {
    const getLocale = useGetLocale('zzsia')
    return <Form
        title={getLocale('title')}
        description={getLocale('description')}
        request={(data) => post({
            url: '/calculate/zzsia',
            data
        }).then((result: any) => {
            show(
                <List>
                    <List.Item>
                        <Stats title="Sph" value={result.sph} suffix="D" />
                        <Stats title="Cyl" value={result.cyl} suffix="D" />
                        <Stats.Divider />
                        <Stats title="Axis" value={result.axis} />
                    </List.Item>
                </List>
            )
        })}
    >
        <Form.Item label="Mani">
            <Form.Item
                noStyle
                name="maniSph"
                label="Mani Sph"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Sph' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="maniCyl"
                label="Mani Cyl"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Cyl' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="maniCylAxis"
                label="Mani Axis"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Axis' />
            </Form.Item>
        </Form.Item>
        <Form.Item
            name="siaD"
            label="SIA D"
            rules={[{ required: true }]}
        >
            <NumberInput />
        </Form.Item>
        <Form.Item
            name="siaAxis"
            label="SIA Axis"
            rules={[{ required: true }]}
        >
            <NumberInput />
        </Form.Item>
    </Form>
}

export default Formula;