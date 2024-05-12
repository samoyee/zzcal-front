import DataChart from '@/app/components/chart';
import Form from '@/app/components/formula-form';
import NumberInput from '@/app/components/number-input';
import show from '@/app/components/result';
import SelectPicker from '@/app/components/select-picker';
import Stats from '@/app/components/statistic';
import { useGetLocale } from '@/locale';
import { post } from '@/service';
import { List } from 'antd-mobile';
import React from 'react';

const Formula: React.FC = () => {
    const getLocale = useGetLocale('zzvr');
    return <Form
        title={getLocale('title')}
        description={getLocale('description')}
        initialValues={{ opicZone: 6.5, version: '1.1' }}
        request={(data) => post({
            url: '/calculate/formulavr',
            data
        }).then((result: any) => {
            show(
                <List>
                    <List.Item extra={
                        <>
                            <Stats title="Sph" value={result.vrSph} suffix="D" />
                            <Stats title="Cyl" value={result.vrCyl} suffix="D" />
                            <Stats.Divider />
                            <Stats title="Axis" value={result.vrAxis} />
                        </>
                    }>VR</List.Item>
                    <List.Item>
                        <DataChart
                            data={[
                                [result.maniCyl, result.maniAxis, "Manifest Astigmatism"],
                                [result.comaCyl, result.comaAxis, "COMA Astigmatism"],
                                [result.secAstiD2, result.secAstiD3, "Secondary Astigmatism"],
                                [result.vrCyl, result.vrAxis, "VR"],
                            ]}
                        />
                    </List.Item>
                </List>
            )
        })}
    >
        <Form.Item name="version" label="Version">
            <SelectPicker options={[
                { label: 'v 1.0', value: '1.0' },
                { label: 'v 1.1', value: '1.1' }
            ]} />
        </Form.Item>
        <Form.Item name="opicZone" label="Opic Zone" rules={[{ required: true }]}>
            <NumberInput suffix="mm" />
        </Form.Item>
        <Form.Item name="c7" label="C7" rules={[{ required: true }]}>
            <NumberInput suffix="μm" />
        </Form.Item>
        <Form.Item name="c8" label="C8" rules={[{ required: true }]}>
            <NumberInput suffix="μm" />
        </Form.Item>
        <Form.Item name="c11" label="C11" rules={[{ required: true }]}>
            <NumberInput suffix="μm" />
        </Form.Item>
        <Form.Item name="c12" label="C12" rules={[{ required: true }]}>
            <NumberInput suffix="μm" />
        </Form.Item>
        <Form.Item name="c13" label="C13" rules={[{ required: true }]}>
            <NumberInput suffix="μm" />
        </Form.Item>
        <Form.Item label="Mani">
            <Form.Item noStyle name="maniSph" label="Mani Sph" rules={[{ required: true }]}>
                <NumberInput placeholder='Sph' suffix="D" />
            </Form.Item>
            <Form.Item noStyle name="maniCyl" label="Mani Cyl" rules={[{ required: true }]}>
                <NumberInput placeholder='Cyl' suffix="D" />
            </Form.Item>
            <Form.Item noStyle name="maniCylAxis" label="Mani Axis" rules={[{ required: true }]}>
                <NumberInput placeholder='Axis' />
            </Form.Item>
        </Form.Item>
    </Form>
}

export default Formula;