import { Input, type InputProps } from 'antd-mobile';
import classNames from 'classnames';
import React from 'react';
import './style.less';

interface NumberInputProps extends Omit<InputProps, 'controls' | 'value' | 'defaultValue' | 'onChange'> {
    value?: number;
    defaultValue?: number;
    onChange?: (value: number | null) => void;
    extra?: string;
    suffix?: string;
    precision?: number;
}

const NumberInput: React.FC<NumberInputProps> = (props) => {
    const { extra, value, defaultValue, onChange, suffix, precision, ...restProps } = props;

    return <div className='number-input-wrapper'>
        <Input
            {...restProps}
            value={typeof value === 'number' ? `${typeof precision === 'number' ? value.toFixed(precision) : value}` : ''}
            defaultValue={typeof defaultValue === 'number' ? `${typeof precision === 'number' ? defaultValue.toFixed(precision) : defaultValue}` : ''}
            onChange={(value) => {
                if (value) {
                    onChange?.(!isNaN(+value) ? +value : null);
                } else {
                    onChange?.(null)
                }
            }}
            className={classNames('number-input', props.className)}
            autoComplete='off'
        />
        {suffix && <div className='number-input-suffix'>{suffix}</div>}
    </div>
}

export default NumberInput;