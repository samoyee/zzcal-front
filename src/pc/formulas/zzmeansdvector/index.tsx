import { useGetLocale } from '@/locale';
import FormulaForm from '@/pc/components/formula-form';
import NumberInput from '@/pc/components/number-input';
import { setResult } from '@/pc/components/result';
import { post } from '@/service';
import * as XLSX from 'xlsx';
import { Col, Form, Row, Statistic, Upload } from 'antd';
import React from 'react';
import './index.less';

const Formula: React.FC = () => {
  const getLocale = useGetLocale('zzmeansdvector');
  return <FormulaForm
    title={getLocale('title')}
    description={getLocale('description')}
    initialValues={{
      zzMeanInfos: [{ sph: null, cyl: null, axis: null }],
    }}
    request={(data) => post<Record<string, number>>({
      url: '/calculate/zzmeansdvector',
      data
    }).then((result) => {
      setResult(
        <Row gutter={16}>
          <Col span={24}>
            <h2>Mean</h2>
          </Col>
          <Col span={8}>
            <Statistic title="Sph" value={result.meanSph} suffix="D" />
          </Col>
          <Col span={8}>
            <Statistic title="Cyl" value={result.meanCyl} suffix="D" />
          </Col>
          <Col span={8}>
            <Statistic title="Axis" value={result.meanAxis} />
          </Col>
          <Col span={24}>
            <h2>Sd</h2>
          </Col>
          <Col span={8}>
            <Statistic title="Sph" value={result.sdSph} suffix="D" />
          </Col>
          <Col span={8}>
            <Statistic title="Cyl" value={result.sdCyl} suffix="D" />
          </Col>
        </Row>
      )
    })}
  >
    <Form.List name="zzMeanInfos">
      {(fields, { add, remove }) => {
        return <>
          {fields.map((field, index) => <Form.Item key={index}>
            <Form.Item
              noStyle
              name={[field.name, "sph"]}
              label="Sph"
              rules={[{ required: true }]}
            >
              <NumberInput placeholder='Sph' />
            </Form.Item>
            <Form.Item
              noStyle
              name={[field.name, "cyl"]}
              label="Cyl"
              rules={[{ required: true }]}
            >
              <NumberInput placeholder='Cyl' />
            </Form.Item>
            <Form.Item
              noStyle
              name={[field.name, "axis"]}
              label="Axis"
              rules={[{ required: true }]}
            >
              <NumberInput placeholder='Axis' />
            </Form.Item>
            <Form.Item noStyle>
              {fields.length > 1 && (
                <a
                  className="zz-mean-control"
                  onClick={() => remove(field.name)}
                >
                  {getLocale('remove')}
                </a>
              )}
              {index === fields.length - 1 && (
                <a
                  className="zz-mean-control"
                  onClick={() => add()}
                >
                  {getLocale('add')}
                </a>
              )}
            </Form.Item>
          </Form.Item>)}
        </>
      }}
    </Form.List>
    <Form.Item noStyle dependencies={[]}>
      {({ setFieldValue }) => (
        <div>
          {getLocale('uploadTips')}（<a href="https://mskmanager.oss-cn-hangzhou.aliyuncs.com/zzcal/zzmean.xlsx" target="_blank">zz_mean.xlsx</a>），
          <Upload
            showUploadList={false}
            beforeUpload={() => false}
            onChange={({ file }) => {
              const fr = new FileReader();
              fr.onload = (ev) => {
                const work = XLSX.read(ev.target?.result, { type: 'buffer' })
                const data = XLSX.utils.sheet_to_json<{ Sph: number; Cyl: number; Axis: number }>(work.Sheets[work.SheetNames[0]])
                console.log(data);
                setFieldValue('zzMeanInfos', data?.map(item => ({
                  sph: item.Sph,
                  cyl: item.Cyl,
                  axis: item.Axis,
                })))
              }
              fr.readAsArrayBuffer(file as unknown as File);
            }}>
            <a>{getLocale('btnUpload')}</a>
          </Upload>
        </div>
      )}
    </Form.Item>

  </FormulaForm>
}

export default Formula;