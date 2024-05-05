import { Form, List } from 'antd-mobile';
import React from 'react';
import NumberInput from '@/app/components/number-input';
import FormulaForm from '@/app/components/formula-form';
import { useGetLocale } from '@/locale';
import show from '@/app/components/result';
import { post } from '@/service';
import Stats from '@/app/components/statistic';

const Formula: React.FC = () => {
    const getLocale = useGetLocale('zzqd');
    return <FormulaForm
        title={getLocale('title')}
        description={getLocale('description')}
        initialValues={{
            opicZone: 5,
            lsa: -1,
            e: 0
        }}
        request={(data) => post({
            url: '/calculate/zzcalqd',
            data
        }).then((result: any) => {
            show(
                <List>
                    <List.Item extra={<Stats value={result.qd} suffix='D' />}>Q.D.</List.Item>
                    <List.Item extra={<Stats value={result.targetD} />}>Target D</List.Item>
                </List>
            )
        })}
    >
        <Form.Item
            name="k"
            label="K"
            rules={[{ required: true }]}
        >
            <NumberInput suffix="D" />
        </Form.Item>
        <Form.Item
            name="correctSd"
            label="Correct SD"
            rules={[{ required: true }]}
        >
            <NumberInput suffix="D" />
        </Form.Item>
        <Form.Item name="e" label="e" rules={[{ required: true }]}>
            <NumberInput />
        </Form.Item>
        <Form.Item name="targetQ" label="Target Q"
            rules={[{ required: true }]}>
            <NumberInput />
        </Form.Item>
    </FormulaForm>
}

export default Formula;