import { useGetLocale } from '@/locale';
import FormulaForm from '@/pc/components/formula-form';
import NumberInput from '@/pc/components/number-input';
import show from '@/pc/components/result';
import { post } from '@/service';
import { Col, Form, Row, Statistic } from 'antd';
import React from 'react';

const Formula: React.FC = () => {
    const getLocale = useGetLocale('zzlsa')
    return <FormulaForm
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
                <Row gutter={16}>
                    <Col span={24}>
                        <h2>Target Q</h2>
                    </Col>
                    <Col span={24}>
                        <Statistic value={result.q} />
                    </Col>
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
                        <Statistic value={result.td} />
                    </Col>
                    <Col span={24}>
                        <h2>Sug. Nomo</h2>
                    </Col>
                    <Col span={24}>
                        <Statistic value={result.nomoD1} />
                    </Col>
                    <Col span={24}>
                        <h2>D</h2>
                    </Col>
                    <Col span={24}>
                        <Statistic value={result.nomoD2} />
                    </Col>
                </Row>
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
    </FormulaForm>
}

export default Formula;