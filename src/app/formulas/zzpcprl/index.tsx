import { useGetLocale } from '@/locale';
import show from '@/app/components/result';
import { post } from '@/service';
import FormulaForm from '@/app/components/formula-form';
import NumberInput from '@/app/components/number-input';
import { Form, List } from 'antd-mobile';
import React from 'react';
import Stats from '@/app/components/statistic';

export const Formula: React.FC = () => {
    const getLocale = useGetLocale('zzpcprl');
    return <FormulaForm
        title={getLocale('title')}
        description={getLocale('description')}
        initialValues={{ ct: 500 }}
        request={(data) => post({
            url: '/calculate/zzpcprl',
            data
        }).then((result: any) => {
            show(
                <List>
                    <List.Item extra={<Stats  value={result.pcPrl} />}>PC-PRL</List.Item>
                </List>
            );
        })}
    >
        <Form.Item label="Mani">
            <Form.Item
                noStyle
                name="maniS"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='sph' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="maniC"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='cyl' suffix="D" />
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
    </FormulaForm>;
};

export default Formula;