import { message, Row } from "antd";
import calcApi from "api/calc";
import React, { Fragment, useState } from "react";
import { useIntl } from "react-intl";
import P from "../modules/CalcP";
import { Form, FormItem } from "../modules/Form";
import Result from "../modules/Result";

export default function ICL() {
    const intl = useIntl();
    const [data, setData] = useState(null);

    const onCalc = async (formData) => {
        try {
            const { data } = await calcApi("zziclvault")(formData);
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
            <h2>{intl.formatMessage({ id: "calc.icl_vault.name" })}</h2>
            <div className="calc-form-wrapper">
                <Form onCalc={onCalc} onReset={onReset} initialValues={{ lt: 4 }}>
                    <Row gutter={24}>
                        <FormItem name="lt" label="LT (mm)" required />
                        <FormItem name="stsh" label="STS-H (mm)" required />
                        <FormItem name="stsv" label="STS-V (mm)" required />
                        <FormItem name="iclSize" label="ICL Size (mm)" required />
                        <FormItem name="iclAx" label="ICL Ax" min={0} max={180} required />
                    </Row>
                </Form>
                {data && (
                    <div className="calc-result">
                        <Result
                            data={data}
                            dataKeys={{
                                estiVault: "Esti Vault (mm)",
                            }}
                        />
                    </div>
                )}
            </div>
            <P id="calc.icl_vault.instructions" />
            <P id="calc.icl_vault.notes" />
        </Fragment>
    );
}
