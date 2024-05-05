import { Form, List } from 'antd-mobile';
import React from 'react';
import NumberInput from '@/app/components/number-input';
import FormulaForm from '@/app/components/formula-form';
import { useGetLocale } from '@/locale';
import show from '@/app/components/result';
import { post } from '@/service';
import Stats from '@/app/components/statistic';

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
        <List>
          <List.Item extra={<Stats title="Sph" value={result.iol} suffix="D" />}>IOL</List.Item>
        </List>
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