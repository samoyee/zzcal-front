import Form from '@/app/components/formula-form';
import NumberInput from '@/app/components/number-input';
import show from '@/app/components/result';
import Stats from '@/app/components/statistic';
import { useGetLocale } from '@/locale';
import { post } from '@/service';
import { List } from 'antd-mobile';
import React from 'react';

const Formula: React.FC = () => {
    const getLocale = useGetLocale('zzlsa')
    return <Form
        title={getLocale('title')}
        description={getLocale('description')}
        initialValues={{
            opicZone: 5,
            psa: 0,
            targetLsa: -1
        }}
        request={(data) => post({
            url: '/calculate/zzlsaqd',
            data
        }).then((result: any) => {
            show(
                <List>
                    <List.Item extra={<Stats value={result.q} />}>Target Q</List.Item>
                    <List.Item extra={<Stats value={result.qd} suffix="D" />}>Q.D.</List.Item>
                    <List.Item extra={<Stats value={result.td} />}>Target D</List.Item>
                    <List.Item extra={<Stats value={result.nomoD1} />}>Sug. Nomo</List.Item>
                    <List.Item extra={<Stats value={result.nomoD2} />}>D</List.Item>
                </List>
            )
        })}
    >
        <Form.Item name="opicZone" label="Opic Zone" rules={[{ required: true }]}>
            <NumberInput suffix="mm" disabled />
        </Form.Item>
        <Form.Item name="kf" label="Kf" rules={[{ required: true }]}>
            <NumberInput suffix="D" />
        </Form.Item>
        <Form.Item name="e" label="e" rules={[{ required: true }]}>
            <NumberInput />
        </Form.Item>
        <Form.Item name="psa" label="PSA" rules={[{ required: true }]}>
            <NumberInput suffix="μm" />
        </Form.Item>
        <Form.Item name="correctDs" label="Correct DS" rules={[{ required: true }]}>
            <NumberInput suffix="D" />
        </Form.Item>
        <Form.Item name="targetLsa" label="Target LSA" rules={[{ required: true }]}>
            <NumberInput suffix="D" />
        </Form.Item>
    </Form>
}

export default Formula;