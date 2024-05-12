import DataChart from '@/app/components/chart';
import Form from '@/app/components/formula-form';
import NumberInput from '@/app/components/number-input';
import show from '@/app/components/result';
import Stats from '@/app/components/statistic';
import { useGetLocale } from '@/locale';
import { post } from '@/service';
import { List, Selector } from 'antd-mobile';
import React from 'react';

const Formula: React.FC = () => {
    const getLocale = useGetLocale('zzar');
    return <Form
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
        <Form.Item name="mode" label={getLocale('selector')}>
            <Radio />
        </Form.Item>
        <Form.Item label="Mani">
            <Form.Item
                noStyle
                name="maniSph"
                label="Mani Sph"
                rules={[{ required: true }]}
            >

                <NumberInput placeholder='Sph' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="maniCyl"
                label="Mani Cyl"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Cyl' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="maniCylAxis"
                label="Mani Axis"
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
                    <Form.Item label="Corn-P">
                        <Form.Item
                            noStyle
                            name="cornPC"
                            label="Corn-P Cyl"
                            rules={[{ required: true }]}
                        >
                            <NumberInput placeholder='Cyl' suffix="D" />
                        </Form.Item>
                        <Form.Item
                            noStyle
                            name="cornPAx"
                            label="Corn-P Axis"
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
                label="TMR Axis"
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
    </Form>
}

export default Formula;

const Radio: React.FC<{ value?: string, onChange?: (value?: string) => void }> = ({ value, onChange }) => {
    const getLocale = useGetLocale('zzar');
    return <Selector
        options={[
            {
                label: getLocale('yes'),
                value: 'available'
            },
            {
                label: getLocale('no'),
                value: 'not'
            }
        ]}
        columns={2}
        value={value ? [value] : []}
        onChange={(value) => {
            if (value.length) {
                onChange?.(value[0]);
            }
        }}
    />
}