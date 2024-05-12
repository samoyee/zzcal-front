import { DownOutlined } from '@ant-design/icons';
import { Input, Picker } from 'antd-mobile';
import { useMergedState } from 'rc-util';
import React, { useMemo, useState } from 'react';
import './style.less'

interface SelectPicker {
    value?: string;
    defaultValue?: string;
    onChange?: (value?: string) => void;
    options?: Array<{ label: string; value: string }>
}

const SelectPicker: React.FC<SelectPicker> = (props) => {
    const [value, setValue] = useMergedState(props.defaultValue, {
        value: props.value,
        onChange(value) {
            props.onChange?.(value);
        }
    })
    const [open, setOpen] = useState(false);

    const inputValue = useMemo(() => props.options?.find(item => item.value === value)?.label, [value, props.options])

    return <>
        <span onClick={() => setOpen(true)} className='select-picker'>
            <Input readOnly value={inputValue} className='select-picker-input' />
            <DownOutlined className='select-picker-icon'/>
        </span>
        <Picker
            columns={[
                props.options || []
            ]}
            visible={open}
            onCancel={() => setOpen(false)}
            onClose={() => setOpen(false)}
            value={value ? [value] : undefined}
            onConfirm={(pickerValue) => {
                setValue(pickerValue[0] as string)
                setOpen(false)
            }}
        />
    </>
}

export default SelectPicker;