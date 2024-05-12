import Form from '@/app/components/formula-form';
import NumberInput from '@/app/components/number-input';
import show from '@/app/components/result';
import Stats from '@/app/components/statistic';
import { useGetLocale } from '@/locale';
import { post } from '@/service';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, List } from 'antd-mobile';
import React from 'react';
import './style.less';

const Formula: React.FC = () => {
    const getLocale = useGetLocale('zzmeansdvector');
    return <Form
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
                <Button block className='mean-add'>
                    <PlusCircleOutlined /> {getLocale('add')}
                </Button>
            )}
            renderHeader={({ index }, { remove }) => (
                <div className='mean-header'>
                    <a onClick={() => remove(index)}>
                        {getLocale('remove')}
                    </a>
                </div>
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
    </Form>
}

export default Formula;