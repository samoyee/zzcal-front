import FormulaForm from '@/app/components/formula-form';
import NumberInput from '@/app/components/number-input';
import show from '@/app/components/result';
import Stats from '@/app/components/statistic';
import { useGetLocale } from '@/locale';
import { post } from '@/service';
import { Form, List } from 'antd-mobile';
import React from 'react';

const Formula: React.FC = () => {
    const getLocale = useGetLocale('zzinnoveyes');
    return <FormulaForm
        title={getLocale('title')}
        description={getLocale('description')} initialValues={{
            refrectionb: -0.25,
            refrectionc: 0
        }}
        request={(data) => post({
            url: '/calculate/zzinnoveyes',
            data
        }).then((result: any) => {
            show(
                <List>
                    <List.Item extra={
                        <>
                            <Stats title="Sph" value={result.treats} suffix="D" />
                            <Stats title="Cyl" value={result.treatc} suffix="D" />
                            <Stats.Divider />
                            <Stats title="Axis" value={result.treatax} />
                        </>
                    }>Treat</List.Item>
                    <List.Item extra={
                        <>
                            <Stats title="Sph" value={result.details} suffix="D" />
                            <Stats title="Cyl" value={result.detailc} suffix="D" />
                            <Stats.Divider />
                            <Stats title="Axis" value={result.detailax} />
                        </>
                    }>Detail</List.Item>
                </List>
            )
        })}
    >
        <Form.Item noStyle dependencies={['manis']}>
            {({ getFieldValue, setFieldValue }) =>
                <Form.Item
                    name="age"
                    label="Age"
                    rules={[{ required: true }]}
                >
                    <NumberInput
                        onChange={(age) => {
                            if (age) {
                                const manis = getFieldValue('manis');
                                if (age >= 40) {
                                    setFieldValue('refrectiona', '-0.1')
                                } else if (age >= 25) {
                                    setFieldValue('refrectiona', (40 - age) * 0.025)
                                } else if (manis) {
                                    setFieldValue('refrectiona', (40 - age) * 0.025 - manis * 0.025)
                                }
                            }
                        }}
                    />
                </Form.Item>
            }
        </Form.Item>
        <Form.Item label="Mani" dependencies={['age']}>
            {({ getFieldValue, setFieldValue }) =>
                <>
                    <Form.Item
                        noStyle
                        name="manis"
                        rules={[{ required: true }]}>
                        <NumberInput
                            placeholder='Sph'
                            suffix="D"
                            onChange={(manis) => {
                                const age = getFieldValue('age');
                                if (age) {
                                    if (age >= 40) {
                                        setFieldValue('refrectiona', -0.1)
                                    } else if (age >= 25) {
                                        setFieldValue('refrectiona', (40 - age) * 0.025)
                                    } else if (manis) {
                                        setFieldValue(
                                            'refrectiona',
                                            (40 - age) * 0.025 - manis * 0.025
                                        )
                                    }
                                }

                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        noStyle
                        name="manic"
                        rules={[{ required: true }]}>
                        <NumberInput
                            placeholder='Cyl'
                            suffix="D"
                        />
                    </Form.Item>
                </>
            }
        </Form.Item>
        <Form.Item label="4mm">
            <Form.Item
                noStyle
                name="mms"
                rules={[{ required: true }]}>
                <NumberInput placeholder='Sph' />
            </Form.Item>
            <Form.Item
                noStyle
                name="mmc"
                rules={[{ required: true }]}>
                <NumberInput placeholder='Cyl' />
            </Form.Item>
            <Form.Item
                noStyle
                name="mmax"
                rules={[{ required: true }]}>
                <NumberInput placeholder='Axis' />
            </Form.Item>
        </Form.Item>
        <Form.Item label="Def-Detail">
            <Form.Item
                noStyle
                name="defdetails"
                rules={[{ required: true }]}>
                <NumberInput placeholder='Sph' />
            </Form.Item>
            <Form.Item
                noStyle
                name="defdetailc"
                rules={[{ required: true }]}>
                <NumberInput placeholder='Cyl' />
            </Form.Item>
            <Form.Item
                noStyle
                name="defdetailax"
                rules={[{ required: true }]}>
                <NumberInput placeholder='Axis' />
            </Form.Item>
        </Form.Item>
        <Form.Item label="Target Refrection">
            <Form.Item
                noStyle
                name="refrectiona"
                rules={[{ required: true }]}>
                <NumberInput placeholder='Sph' precision={2} />
            </Form.Item>
            <Form.Item
                noStyle
                name="refrectionb"
                rules={[{ required: true }]}>
                <NumberInput placeholder='Cyl' />
            </Form.Item>
            <Form.Item
                noStyle
                name="refrectionc"
                rules={[{ required: true }]}>
                <NumberInput placeholder='Axis' />
            </Form.Item>
        </Form.Item>
    </FormulaForm>
}


export default Formula;