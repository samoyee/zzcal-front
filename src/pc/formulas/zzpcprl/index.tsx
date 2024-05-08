import { useGetLocale } from '@/locale';
import FormulaForm from '@/pc/components/formula-form';
import NumberInput from '@/pc/components/number-input';
import show from '@/pc/components/result';
import { post } from '@/service';
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
        <Form.Item label="Mani" required>
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
            rules={[{ required: true }]}
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