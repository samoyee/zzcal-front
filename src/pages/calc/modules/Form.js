import { Button, Col, Form as AForm, InputNumber, Tooltip } from "antd";
import React, { forwardRef, useImperativeHandle, useMemo } from "react";
import { useIntl } from "react-intl";
import "./Form.less";

const formLayout = {
    labelCol: {
        sm: { span: 14 },
    },
    wrapperCol: {
        sm: { span: 10 },
    },
};

const LAYOUT = {
    span: 12,
    xs: 24,
    sm: 12,
};

export const Form = forwardRef(function Form({ children, initialValues, onCalc, onReset }, ref) {
    const intl = useIntl();
    const [form] = AForm.useForm();

    useImperativeHandle(
        ref,
        () => {
            return {
                async validate(callback) {
                    form.validateFields()
                        .then((formData) => {
                            typeof callback === "function" && callback(formData);
                        })
                        .catch((e) => { });
                },
                resetFields() {
                    form.resetFields();
                },
                setFieldsValue(values) {
                    form.setFieldsValue(values);
                },
                getFieldValue(name) {
                    return form.getFieldValue(name);
                }
            };
        },
        []
    );

    const handleCalc = () => {
        form.validateFields()
            .then((formData) => {
                typeof onCalc === "function" && onCalc(formData);
            })
            .catch((e) => { });
    }

    const handleReset = () => {
        form.resetFields();
        typeof onReset === "function" && onReset();
    }

    return (
        <AForm
            className="calc-form"
            form={form}
            {...formLayout}
            initialValues={initialValues}
            colon={false}
        >
            {children}
            <div className="calc-form-btn">
                <Button type="primary" onClick={handleCalc}>
                    {intl.formatMessage({ id: "btn.calc" })}
                </Button>
                <Button onClick={handleReset}>{intl.formatMessage({ id: "btn.clear" })}</Button>
            </div>
        </AForm>
    );
});

export const FormList = AForm.List;

export function FormItem({ layout, label, tip, name, required, max, min, rules, disabled, onChange, hidden, ...restProps }) {
    const intl = useIntl();
    const _label = useMemo(() => {
        if (tip) return <Tooltip title={intl.formatMessage({ id: tip })}>{label}</Tooltip>;
        return label;
    }, [tip, label]);

    const _rules = useMemo(() => {
        let _rules_ = [];
        let _label = label.replace(/\([^\)]*\)/g, '');

        // 必填
        if (required) {
            _rules_.push({
                required: true,
                message: intl.formatMessage({ id: "form.rules.required.field" }, { label: _label }),
            });
        }

        // 设置最大值和最小值
        let hasMax = max !== undefined,
            hasMin = min !== undefined;
        if (hasMax || hasMin) {
            _rules_.push({
                min,
                max,
                type: "number",
                message: intl.formatMessage(
                    {
                        id:
                            hasMax && hasMin
                                ? "form.rules.range"
                                : hasMax
                                    ? "form.rules.max"
                                    : "form.rules.min",
                    },
                    {
                        label: _label,
                        max,
                        min,
                    }
                ),
            });
        }

        if (rules) _rules_ = _rules_.concat(rules);

        return _rules_;
    }, [label, required, max, min, rules]);

    const stateLayout = useMemo(() => ({ ...LAYOUT, ...layout }), [layout]);

    return (
        <Col {...stateLayout}>
            <AForm.Item {...{ ...restProps, name, rules: _rules }} title={label} label={_label} hidden={hidden}>
                <InputNumber disabled={disabled} autoComplete="off" className="calc-form-input" onChange={onChange} />
            </AForm.Item>
        </Col>
    );
}
