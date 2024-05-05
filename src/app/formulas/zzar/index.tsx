import { useGetLocale } from '@/locale';
import { post } from '@/service';
import DataChart from '@/app/components/chart';
import FormulaForm from '@/app/components/formula-form';
import NumberInput from '@/app/components/number-input';
import show from '@/app/components/result';
import { Form, List, Radio } from 'antd-mobile';
import React from 'react';
import Stats from '@/app/components/statistic';

const Formula: React.FC = () => {
    const getLocale = useGetLocale('zzar');
    return <FormulaForm
        title={getLocale('title')}
        description={getLocale('description')}
        initialValues={{
            mode: 'not',
            resLensC: 20,
        }}
        request={(data) => post({
            url: '/calculate/zzar2',
            data
        })
            .then((result: any) => {
                show(
                    <List>
                        <List.Item extra={
                            <>
                                <Stats title="Sph" value={result.arSph} suffix="D" />
                                <Stats title="Cyl" value={result.arCyl} suffix="D" />
                                <Stats.Divider />
                                <Stats title="Axis" value={result.arAxis} />
                            </>
                        }>AR</List.Item>
                        <List.Item>
                            <DataChart
                                data={[
                                    [result.hoAsC, result.hoAsA, "HOAs Astigmatism"],
                                    [result.corneaC, result.corneaA, "Corneal Astigmatism"],
                                    [result.lensC, result.lensA, "Lens Astigmatism"],
                                    [result.arCyl, result.arAxis, "AR"],
                                ]}
                            />
                        </List.Item>
                    </List>
                )
            })}
    >
        <Form.Item name="mode" extra={getLocale('selector')}>
            <Radio.Group>
                <Radio value="available">{getLocale('yes')}</Radio>
                <Radio value="not">{getLocale("no")}</Radio>
            </Radio.Group>
        </Form.Item>
        <Form.Item label="Mani" required>
            <Form.Item
                noStyle
                name="maniSph"
                label="Sph"
                rules={[{ required: true }]}
            >

                <NumberInput placeholder='Sph' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="maniCyl"
                label="Cyl"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Cyl' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="maniCylAxis"
                label="Axis"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Axis' />
            </Form.Item>
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
                        if (getFieldValue("kf") > value) {
                            return Promise.reject("Ks >= Kf");
                        }
                        return Promise.resolve();
                    },
                }),
            ]}
        >
            <NumberInput suffix="D" />
        </Form.Item>
        <Form.Item
            name="kf2"
            label="Kf Ax"
            rules={[{ required: true }]}
        >
            <NumberInput />
        </Form.Item>
        <Form.Item noStyle dependencies={['mode']}>
            {({ getFieldValue }) =>
                getFieldValue('mode') === 'available' &&
                <>
                    <Form.Item label="Corn-P" required>
                        <Form.Item
                            noStyle
                            name="cornPC"
                            rules={[{ required: true }]}
                        >
                            <NumberInput placeholder='Cyl' suffix="D" />
                        </Form.Item>
                        <Form.Item
                            noStyle
                            name="cornPAx"
                            rules={[{ required: true }]}
                        >
                            <NumberInput placeholder='Axis' />
                        </Form.Item>
                    </Form.Item>
                </>}
        </Form.Item>
        <Form.Item label="TMR">
            <Form.Item
                noStyle
                name="tmrc"
                label="TMR Cyl"
                rules={[
                    { required: true },
                    { type: 'number', max: 0, message: getLocale('maxValid') }
                ]}
            >
                <NumberInput placeholder='Cyl' suffix="D" max={0} />
            </Form.Item>
            <Form.Item
                noStyle
                name="tmra"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Axis' />
            </Form.Item>
        </Form.Item>
        <Form.Item
            name="resLensC"
            label="Res-Lens C"
            rules={[{ required: true }]}
        >
            <NumberInput suffix="%" />
        </Form.Item>
    </FormulaForm>
}

export default Formula;