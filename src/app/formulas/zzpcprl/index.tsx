import Form from '@/app/components/formula-form';
import NumberInput from '@/app/components/number-input';
import show from '@/app/components/result';
import Stats from '@/app/components/statistic';
import { useGetLocale } from '@/locale';
import { post } from '@/service';
import { List } from 'antd-mobile';
import React from 'react';

export const Formula: React.FC = () => {
    const getLocale = useGetLocale('zzpcprl');
    return <Form
        title={getLocale('title')}
        description={getLocale('description')}
        initialValues={{ ct: 500 }}
        request={(data) => post({
            url: '/calculate/zzpcprl',
            data
        }).then((result: any) => {
            show(
                <List>
                    <List.Item extra={<Stats value={result.pcPrl} />}>PC-PRL</List.Item>
                </List>
            );
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
        </Form.Item>
        <Form.Item
            name="k"
            label="K"
            rules={[{ required: true }]}
        >
            <NumberInput suffix="D" />
        </Form.Item>
        <Form.Item
            name="ct"
            label="CT"
            rules={[ { required: true } ]}
        >
            <NumberInput suffix="μm" />
        </Form.Item>
        <Form.Item
            name="ac"
            label="AC"
            rules={[{ required: true }]}
        >
            <NumberInput suffix="mm" />
        </Form.Item>
    </Form>;
};

export default Formula;