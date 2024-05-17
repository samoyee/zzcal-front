import { useGetLocale } from '@/locale';
import FormulaForm from '@/pc/components/formula-form';
import NumberInput from '@/pc/components/number-input';
import show from '@/pc/components/result';
import { post } from '@/service';
import { Col, Form, Row, Statistic, Upload, message } from 'antd';
import React from 'react';
import './index.less';

const Formula: React.FC = () => {
    const getLocale = useGetLocale('zzmeansdvector');
    const [msg, msgHolder] = message.useMessage();
    return <FormulaForm
        title={getLocale('title')}
        description={getLocale('description')}
        initialValues={{
            zzMeanInfos: [{ sph: null, cyl: null, axis: null }],
        }}
        request={(data) => post({
            url: '/calculate/zzmeansdvector',
            data
        }).then((result: any) => {
            show(
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
        {msgHolder}
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
                    <Upload showUploadList={false} action="/api/calculate/zzmeanexcel" name='file' onChange={({ file }) => {
                        if (file.status === 'done') {
                            msg.destroy('ZZ_MEAN_KEY');
                            const data = file.response?.data;
                            if (data?.zzMeanInfos?.length > 0) {
                                setFieldValue('zzMeanInfos', data?.zzMeanInfos)
                            }
                        } else {
                            msg.loading({ content: getLocale("loading"), key: 'ZZ_MEAN_KEY' })
                        }
                    }}>
                        <a>{getLocale('btnUpload')}</a>
                    </Upload>
                </div>
            )}
        </Form.Item>

    </FormulaForm>
}

export default Formula;