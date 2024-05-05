import { Form, List } from 'antd-mobile';
import React from 'react';
import NumberInput from '@/app/components/number-input';
import FormulaForm from '@/app/components/formula-form';
import { useGetLocale } from '@/locale';
import show from '@/app/components/result';
import { post } from '@/service';
import Stats from '@/app/components/statistic';

const Formula: React.FC = () => {
    const getLocale = useGetLocale('zzvrpro')
    return <FormulaForm
        title={getLocale('title')}
        description={getLocale('zzvrpro')}
        request={(data) => post({
            url: '/calculate/formulavrpro',
            data
        }).then((result: any) => {
            show(
                <List>
                    <List.Item extra={
                        <>
                            <Stats title="Sph" value={result.correctSph} suffix="D" />
                            <Stats title="Cyl" value={result.correctCyl} suffix="D" />
                            <Stats.Divider />
                            <Stats title="Axis" value={result.correctCylAxis} />
                        </>
                    }>Correct</List.Item>
                </List>
            )
        })}
    >
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
        <Form.Item label="Mani" required>
            <Form.Item noStyle name="maniSph">
                <NumberInput placeholder='sph' suffix="D" />
            </Form.Item>
            <Form.Item noStyle name="maniCyl">
                <NumberInput placeholder='cyl' suffix="D" />
            </Form.Item>
            <Form.Item noStyle name="maniCylAxis">
                <NumberInput placeholder='axis' />
            </Form.Item>
        </Form.Item>
    </FormulaForm>
}

export default Formula;