import { useGetLocale } from '@/locale';
import show from '@/app/components/result';
import { post } from '@/service';
import FormulaForm from '@/app/components/formula-form';
import NumberInput from '@/app/components/number-input';
import { Form, List } from 'antd-mobile';
import React from 'react';
import Stats from '@/app/components/statistic';

const Formula: React.FC = () => {
    const getLocale = useGetLocale('zzex500opmi');
    return <FormulaForm
        title={getLocale('title')}
        description={getLocale('description')}
        request={(data) => post({
            url: '/calculate/zzexopmi',
            data
        }).then((result: any) => {
            show(
                <List>
                    <List.Item extra={<Stats value={result.gr} />}>Gr</List.Item>
                </List>
            )
        })}
    >
        <Form.Item
            name="k"
            label="K"
            rules={[{ required: true }]}
        >
            <NumberInput />
        </Form.Item>
    </FormulaForm>
}

export default Formula;