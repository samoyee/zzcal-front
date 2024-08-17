import { useGetLocale } from '@/locale';
import FormulaForm from '@/pc/components/formula-form';
import NumberInput from '@/pc/components/number-input';
import { setResult } from '@/pc/components/result';
import { post } from '@/service';
import { Col, Form, Row, Statistic } from 'antd';
import React from 'react';

const Formula: React.FC = () => {
  const getLocale = useGetLocale('zzorthokglasses');
  return <FormulaForm
    title={getLocale('title')}
    description={getLocale('description')}
    request={(data) => post<Record<string, number>>({
      url: '/calculate/zzok',
      data
    }).then((result) => {
      setResult(
        <Row gutter={16}>
          <Col span={24}>
            <h2>Ac</h2>
          </Col>
          <Col span={24}>
            <Statistic value={result.ac} />
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
      <NumberInput />
    </Form.Item>
  </FormulaForm>
}

export default Formula;