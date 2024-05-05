import { Form, List } from 'antd-mobile';
import React from 'react';
import NumberInput from '@/app/components/number-input';
import FormulaForm from '@/app/components/formula-form';
import { useGetLocale } from '@/locale';
import show from '@/app/components/result';
import { post } from '@/service';
import Stats from '@/app/components/statistic';

const Formula: React.FC = () => {
    const getLocale = useGetLocale('zzsia')
    return <FormulaForm
        title={getLocale('title')}
        description={getLocale('description')}
        request={(data) => post({
            url: '/calculate/zzsia',
            data
        }).then((result: any) => {
            show(
                <List>
                    <List.Item>
                        <Stats title="Sph" value={result.sph} suffix="D" />
                        <Stats title="Cyl" value={result.cyl} suffix="D" />
                        <Stats.Divider />
                        <Stats title="Axis" value={result.axis} />
                    </List.Item>
                </List>
            )
        })}
    >
        <Form.Item label="Mani" required>
            <Form.Item
                noStyle
                name="maniSph"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='sph' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="maniCyl"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='cyl' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="maniCylAxis"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='axis' />
            </Form.Item>
        </Form.Item>
        <Form.Item
            name="siaD"
            label="SIA D"
            rules={[{ required: true }]}
        >
            <NumberInput />
        </Form.Item>
        <Form.Item
            name="siaAxis"
            label="SIA Axis"
            rules={[{ required: true }]}
        >
            <NumberInput />
        </Form.Item>
    </FormulaForm>
}

export default Formula;