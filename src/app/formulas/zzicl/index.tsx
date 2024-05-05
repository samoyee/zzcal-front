import { useGetLocale } from '@/locale';
import { post } from '@/service';
import FormulaForm from '@/app/components/formula-form';
import NumberInput from '@/app/components/number-input';
import show from '@/app/components/result';
import { Form, List } from 'antd-mobile';
import React from 'react';
import Stats from '@/app/components/statistic';

const Formula: React.FC = () => {
    const getLocale = useGetLocale('zzicl');
    return <FormulaForm
        title={getLocale('title')}
        description={getLocale('description')}
        initialValues={{
            ct: 500,
            lt: 4,
            planIclS: 0,
            planIclC: 0,
            planIclAx: 0,
            sia: 0.3,
            siaAx: 0
        }}
        request={(data) => post({
            url: '/calculate/zzicl',
            data
        }).then((result: any) => {
            show(
                <List>
                    <List.Item extra={
                        <>
                            <Stats title="Sph" value={result.iclS} suffix="D" />
                            <Stats title="Cyl" value={result.iclC} suffix="D" />
                            <Stats.Divider />
                            <Stats title="Axis" value={result.iclAx} />
                        </>
                    }>ICL</List.Item>
                    <List.Item extra={
                        <Stats value={result.estiVault} suffix="mm" />
                    }>Esti Vault</List.Item>
                    <List.Item extra={
                        <>
                            <Stats title="Sph" value={result.resiDualS} suffix="D" />
                            <Stats title="Cyl" value={result.resiDualC} suffix="D" />
                            <Stats.Divider />
                            <Stats title="Axis" value={result.resiDualA} />
                        </>
                    }>Residual</List.Item>
                </List>
            )
        })}>
        <Form.Item label="Mani" required>
            <Form.Item
                noStyle
                name="maniS"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Sph' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="maniC"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Cyl' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="maniAx"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Axis' />
            </Form.Item>
        </Form.Item>
        <Form.Item
            name="k"
            label="K"
            rules={[{ required: true }]}
        >
            <NumberInput suffix="D" />
        </Form.Item>
        <Form.Item
            name="ct"
            label="CT"
            rules={[{ required: true }]}
        >
            <NumberInput suffix="μm" />
        </Form.Item>
        <Form.Item
            name="ac"
            label="AC"
            rules={[{ required: true }]}
        >
            <NumberInput suffix="mm" />
        </Form.Item>
        <Form.Item
            name="lt"
            label="LT"
            rules={[{ required: true }]}
        >
            <NumberInput suffix="mm" />
        </Form.Item>
        <Form.Item
            name="stsH"
            label="STS-H"
            rules={[{ required: true }]}
        >
            <NumberInput suffix="mm" />
        </Form.Item>
        <Form.Item
            name="stsV"
            label="STS-V"
            rules={[{ required: true }]}
        >
            <NumberInput suffix="mm" />
        </Form.Item>
        <Form.Item
            name="iclSize"
            label="ICL Size"
            rules={[{ required: true }]}
        >
            <NumberInput suffix="mm" />
        </Form.Item>
        <Form.Item
            name="iclAx"
            label="ICL Ax"
            rules={[
                { required: true },
                { type: 'number', min: 0, max: 180 }
            ]}
        >
            <NumberInput suffix="mm" min={0} max={180} />
        </Form.Item>
        <Form.Item label="Plan ICL" required>
            <Form.Item
                noStyle
                name="planIclS"
                label="Plan ICL Sph"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Sph' suffix="D" />
            </Form.Item>
            <Form.Item
                noStyle
                name="planIclC"
                label="Plan ICL Cyl"
                rules={[{ required: true }]}
            >
                <NumberInput placeholder='Cyl' suffix="D" />
            </Form.Item>
        </Form.Item>
        <Form.Item
            name="sia"
            label="SIA"
            rules={[{ required: true }]}
        >
            <NumberInput suffix="D" />
        </Form.Item>
        <Form.Item
            name="siaAx"
            label="SIA Ax"
            rules={[{ required: true }]}
        >
            <NumberInput />
        </Form.Item>
    </FormulaForm>
}

export default Formula;