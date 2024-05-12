import Form from '@/app/components/formula-form';
import NumberInput from '@/app/components/number-input';
import show from '@/app/components/result';
import Stats from '@/app/components/statistic';
import { useGetLocale } from '@/locale';
import { post } from '@/service';
import { List } from 'antd-mobile';
import React from 'react';

const Formula: React.FC = () => {
    const getLocale = useGetLocale('zzorthokglasses');
    return <Form
        title={getLocale('title')}
        description={getLocale('description')}
        request={(data) => post({
            url: '/calculate/zzok',
            data
        }).then((result: any) => {
            show(
                <List>
                    <List.Item extra={<Stats value={result.ac} />}>Ac</List.Item>
                </List>
            )
        })}
    >
        <Form.Item
            name="k"
            label="K"
            rules={[{ required: true }]}
        >
            <NumberInput />
        </Form.Item>
    </Form>
}

export default Formula;