import FormulaForm from '@/app/components/formula-form';
import NumberInput from '@/app/components/number-input';
import Stats from '@/app/components/statistic';
import { useGetLocale } from '@/locale';
import show from '@/app/components/result';
import { post } from '@/service';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Form, List } from 'antd-mobile';
import React from 'react';

const Formula: React.FC = () => {
    const getLocale = useGetLocale('zzmeansdvector');
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
                <List>
                    <List.Item extra={
                        <>
                            <Stats title="Sph" value={result.meanSph} suffix="D" />
                            <Stats title="Cyl" value={result.meanCyl} suffix="D" />
                            <Stats.Divider />
                            <Stats title="Axis" value={result.meanAxis} />
                        </>
                    }>Mean</List.Item>
                    <List.Item extra={
                        <>
                            <Stats title="Sph" value={result.sdSph} suffix="D" />
                            <Stats title="Cyl" value={result.sdCyl} suffix="D" />
                        </>
                    }>Sd</List.Item>
                </List>
            )
        })}
    >
        <Form.Array name="zzMeanInfos"
            onAdd={operation => operation.add({ sph: null, cyl: null, axis: null })}
            renderAdd={() => (
                <span>
                    <PlusCircleOutlined /> 添加
                </span>
            )}
            renderHeader={({ index }, { remove }) => (
                <>
                    <a onClick={() => remove(index)} style={{ float: 'right' }}>
                        删除
                    </a>
                </>
            )}
        >
            {(fields) => {
                return fields.map(({ index }) =>
                    <Form.Item key={index}>
                        <Form.Item
                            noStyle
                            name={[index, "sph"]}
                            label="Sph"
                            rules={[{ required: true }]}
                        >
                            <NumberInput placeholder='Sph' />
                        </Form.Item>
                        <Form.Item
                            noStyle
                            name={[index, "cyl"]}
                            label="Cyl"
                            rules={[{ required: true }]}
                        >
                            <NumberInput placeholder='Cyl' />
                        </Form.Item>
                        <Form.Item
                            noStyle
                            name={[index, "axis"]}
                            label="Axis"
                            rules={[{ required: true }]}
                        >
                            <NumberInput placeholder='Axis' />
                        </Form.Item>
                    </Form.Item>)
            }}
        </Form.Array>
    </FormulaForm>
}

export default Formula;