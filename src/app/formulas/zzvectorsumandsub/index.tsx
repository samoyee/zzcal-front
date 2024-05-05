import { Form, List } from 'antd-mobile';
import React from 'react';
import NumberInput from '@/app/components/number-input';
import FormulaForm from '@/app/components/formula-form';
import { useGetLocale } from '@/locale';
import show from '@/app/components/result';
import { post } from '@/service';
import DataChart from '@/app/components/chart';
import Stats from '@/app/components/statistic';

const Formula: React.FC = () => {
    const getLocale = useGetLocale('zzvectorsumandsub');
    return <FormulaForm
        title={getLocale('title')}
        description={getLocale('description')}
        request={(data) => post({
            url: '/calculate/zzastigmatism',
            data
        }).then((result: any) => {
            show(
                <List>
                    <List.Item extra={
                        <>
                            <Stats title="Sph" value={result.sph1add2} suffix="D" />
                            <Stats title="Cyl" value={result.cyl1add2} suffix="D" />
                            <Stats.Divider />
                            <Stats title="Axis" value={result.axis1add2} />
                        </>
                    }>A + B</List.Item>
                    <List.Item extra={
                        <>
                            <Stats title="Sph" value={result.sph1cut2} suffix="D" />
                            <Stats title="Cyl" value={result.cyl1cut2} suffix="D" />
                            <Stats.Divider />
                            <Stats title="Axis" value={result.axis1cut2} />
                        </>
                    }>A - B</List.Item>
                    <List.Item>
                        <DataChart
                            data={[
                                [data.cyl1, data.axis1, "A"],
                                [data.cyl2, data.axis2, "B"],
                                [result.cyl1add2, result.axis1add2, "A + B"],
                                [result.cyl1cut2, result.axis1cut2, "A - B"],
                            ]}
                        />
                    </List.Item>
                </List>
            )
        })}
    >
        <Form.Item label="A" required>
            <Form.Item
                noStyle
                name="sph1"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Sph' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="cyl1"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Cyl' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="axis1"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Axis' />
            </Form.Item>
        </Form.Item>
        <Form.Item label="B" required>
            <Form.Item
                noStyle
                name="sph2"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Sph' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="cyl2"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Cyl' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="axis2"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Axis' />
            </Form.Item>
        </Form.Item>
    </FormulaForm>
}

export default Formula;