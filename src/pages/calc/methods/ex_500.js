import { message, Row } from "antd";
import calcApi from "api/calc";
import React, { Fragment, useState } from "react";
import { useIntl } from "react-intl";
import P from "../modules/CalcP";
import { Form, FormItem } from "../modules/Form";
import Result from "../modules/Result";

export default function EX_500_OPMI() {
    const intl = useIntl();
    const [data, setData] = useState(null);

    const onCalc = async (formData) => {
        try {
            const { data } = await calcApi("zzexformula")(formData);
            setData(data);
        } catch (e) {
            setData(null);
            message.error(intl.formatMessage({ id: "text.systemError" }));
        }
    }

    const onReset = () => {
        setData(null);
    }

    return (
        <Fragment>
            <h2>{intl.formatMessage({ id: "calc.ex_500.name" })}</h2>
            <div className="calc-form-wrapper">
                <Form onCalc={onCalc} onReset={onReset}>
                    <Row gutter={24}>
                        <FormItem name="um1" label="角膜厚度(μm)" required />
                        <FormItem name="um2" label="瓣厚度(μm)" required />
                        <FormItem name="kf" label="Kf(D)" required />
                        <FormItem name="ks" label="Ks(D)" required rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (value && getFieldValue("kf") <= value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("Ks >= Kf"));
                                },
                            }),
                        ]} />
                        <FormItem name="d2" label="球镜(D)" required rules={[{ max: 0, type: 'number', message: '球镜≤0' }]} />
                        <FormItem name="d1" label="柱镜(D)" required />
                        <FormItem name="mm" label="光学区(mm)" required />
                        <FormItem name="q" label="术前Q值" required />
                    </Row>
                </Form>
                {data && (
                    <div className="calc-result">
                        <Result
                            data={data}
                            dataKeys={{
                                um1: "消融厚度(μm)",
                                um2: "剩余基质层厚度(μm)"
                            }}
                        />
                    </div>
                )}
            </div>
            <P id="calc.ex_500.instructions" />
            <div style={{color: 'red' }}>* 计算结果仅供参考，实际结果以EX500设备为准</div>
        </Fragment>
    );
}
