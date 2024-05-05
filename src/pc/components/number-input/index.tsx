import { InputNumber, Tooltip, type InputNumberProps } from 'antd';
import classNames from 'classnames';
import React from 'react';
import './style.less';

interface NumberInputProps extends Omit<InputNumberProps, 'controls' | 'value' | 'defaultValue' | 'onChange'> {
    value?: number;
    defaultValue?: number;
    onChange?: (value: number | null) => void;
    extra?: string;
}

const NumberInput: React.FC<NumberInputProps> = (props) => {
    const { extra, value, defaultValue, onChange, ...restProps } = props;

    const input = <InputNumber
        {...restProps}
        value={value}
        defaultValue={defaultValue}
        onChange={(value) => {
            onChange?.(value as number);
        }}
        controls={false}
        className={classNames('formula-number-input', props.className)}
    />

    if (extra)
        return <Tooltip overlay={extra}>{input}</Tooltip>;
    return input
}

export default NumberInput;