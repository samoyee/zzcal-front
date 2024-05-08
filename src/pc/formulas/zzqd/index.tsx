import { useGetLocale } from '@/locale';
import FormulaForm from '@/pc/components/formula-form';
import NumberInput from '@/pc/components/number-input';
import show from '@/pc/components/result';
import { post } from '@/service';
import { Col, Form, Row, Statistic } from 'antd';
import React from 'react';

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
                <Row gutter={16}>
                    <Col span={24}>
                        <h2>Q.D.</h2>
                    </Col>
                    <Col span={24}>
                        <Statistic value={result.qd} suffix="D" />
                    </Col>
                    <Col span={24}>
                        <h2>Target D</h2>
                    </Col>
                    <Col span={24}>
                        <Statistic value={result.targetD} />
                    </Col>
                </Row>
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