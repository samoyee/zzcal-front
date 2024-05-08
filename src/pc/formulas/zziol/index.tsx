import { useGetLocale } from '@/locale';
import FormulaForm from '@/pc/components/formula-form';
import NumberInput from '@/pc/components/number-input';
import show from '@/pc/components/result';
import { post } from '@/service';
import { Col, Form, Row, Statistic } from 'antd';
import React from 'react';

const Formula: React.FC = () => {
  const getLocale = useGetLocale('zziol')
  return <FormulaForm
    title={getLocale('title')}
    description={getLocale('description')}
    initialValues={{
      targetSe: 0,
      cct: 500,
      lt: 5,
    }}
    request={(data) => post({
      url: '/calculate/zzcaliol',
      data
    }).then((result: any) => {
      show(
        <Row gutter={16}>
          <Col span={24}>
            <h2>IOL</h2>
          </Col>
          <Col span={24}>
            <Statistic value={result.iol} suffix="D" />
          </Col>
        </Row>
      )
    })}
  >
    <Form.Item
      name="aConstant"
      label="A Constant"
      rules={[{ required: true }]}
    >
      <NumberInput />
    </Form.Item>
    <Form.Item
      name="targetSe"
      label="Target SE"
      rules={[{ required: true }]}
    >
      <NumberInput suffix="D" />
    </Form.Item>
    <Form.Item
      name="al"
      label="AL"
      rules={[{ required: true }]}
    >
      <NumberInput suffix="mm" />
    </Form.Item>
    <Form.Item
      name="acd"
      label="ACD"
      rules={[{ required: true }]}
    >
      <NumberInput suffix="mm" />
    </Form.Item>
    <Form.Item
      name="lt"
      label="LT"
      rules={[{ required: true }]}
    >
      <NumberInput suffix="mm" />
    </Form.Item>
    <Form.Item
      name="meanpp"
      label="Mean PP"
      rules={[{ required: true }]}
    >
      <NumberInput suffix="D" />
    </Form.Item>
    <Form.Item
      name="cct"
      label="CCT"
      rules={[{ required: true }]}
    >
      <NumberInput suffix="μm" />
    </Form.Item>
  </FormulaForm>
}

export default Formula;