import { useGetLocale } from '@/locale';
import FormulaForm from '@/pc/components/formula-form';
import NumberInput from '@/pc/components/number-input';
import show from '@/pc/components/result';
import { post } from '@/service';
import { Col, Form, Row, Statistic } from 'antd';
import React from 'react';

const Formula: React.FC = () => {
  const getLocale = useGetLocale('zzex500');
  return <FormulaForm
    title={getLocale('title')}
    description={getLocale('description')}
    request={(data) => post({
      url: '/calculate/zzexformula',
      data
    }).then((result: any) => {
      show(
        <Row gutter={16}>
          <Col span={24}>
            <h2>消融厚度</h2>
          </Col>
          <Col span={24}>
            <Statistic value={result.um1} suffix="μm" />
          </Col>
          <Col span={24}>
            <h2>剩余基质层厚度</h2>
          </Col>
          <Col span={24}>
            <Statistic value={result.um2} suffix="μm" />
          </Col>
        </Row>,
        {
          attention: "计算结果仅供参考，实际结果以EX500设备为准"
        }
      )
    })}>
    <Form.Item
      name="um1"
      label="角膜厚度"
      rules={[{ required: true }]}
    >
      <NumberInput suffix="μm" />
    </Form.Item>
    <Form.Item
      name="um2"
      label="瓣厚度"
      rules={[{ required: true }]}
    >
      <NumberInput suffix="μm" />
    </Form.Item>
    <Form.Item
      name="kf"
      label="Kf"
      rules={[{ required: true }]}
    >
      <NumberInput suffix="D" />
    </Form.Item>
    <Form.Item
      name="ks"
      label="Ks"
      rules={[
        { required: true },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (getFieldValue("kf") > value)
              return Promise.reject("Ks >= Kf");
            return Promise.resolve();
          },
        })
      ]}
    >
      <NumberInput suffix="D" />
    </Form.Item>
    <Form.Item
      name="d2"
      label="球镜"
      rules={[
        { required: true },
        { max: 0, type: 'number', message: '球镜≤0' }
      ]}
    >
      <NumberInput suffix="D" max={0} />
    </Form.Item>
    <Form.Item
      name="d1"
      label="柱镜"
      rules={[{ required: true }]}
    >
      <NumberInput suffix="D" />
    </Form.Item>
    <Form.Item
      name="mm"
      label="光学区"
      rules={[{ required: true }]}
    >
      <NumberInput suffix="mm" />
    </Form.Item>
    <Form.Item
      name="q"
      label="术前Q值"
      rules={[{ required: true }]}
    >
      <NumberInput />
    </Form.Item>
  </FormulaForm>
}

export default Formula;