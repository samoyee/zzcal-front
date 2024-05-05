import { useGetLocale } from '@/locale';
import show from '@/pc/components/result';
import { post } from '@/service';
import FormulaForm from '@/pc/components/formula-form';
import NumberInput from '@/pc/components/number-input';
import { Col, Form, Row, Statistic } from 'antd';
import React from 'react';

const Formula: React.FC = () => {
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
                <Row gutter={16}>
                    <Col span={24}>
                        <h2>PC-PRL</h2>
                    </Col>
                    <Col span={24}>
                        <Statistic value={result.pcPrl} />
                    </Col>
                </Row>
            )
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
    </FormulaForm>
}

export default Formula;