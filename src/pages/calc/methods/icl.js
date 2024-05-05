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
            const { data } = await calcApi("zzicl")(formData);
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
            <h2>{intl.formatMessage({ id: "calc.icl.name" })}</h2>
            <div className="calc-form-wrapper">
                <Form onCalc={onCalc} onReset={onReset}
                    initialValues={{
                        ct: 500,
                        lt: 4,
                        planIclS: 0,
                        planIclC: 0,
                        planIclAx: 0,
                        sia: 0.3,
                        siaAx: 0
                    }}>
                    <Row gutter={24}>
                        <FormItem name="maniS" label="Mani S (D)" required />
                        <FormItem name="maniC" label="Mani C (D)" required />
                        <FormItem name="maniAx" label="Mani Ax" required />
                        <FormItem name="k" label="K (D)" required />
                        <FormItem name="ct" label="CT (μm)" required />
                        <FormItem name="ac" label="AC (mm)" required />
                        <FormItem name="lt" label="LT (mm)" required />
                        <FormItem name="stsH" label="STS-H (mm)" required />
                        <FormItem name="stsV" label="STS-V (mm)" required />
                        <FormItem name="iclSize" label="ICL Size (mm)" required />
                        <FormItem name="iclAx" label="ICL Ax" min={0} max={180} required />
                        <FormItem name="planIclS" label="Plan ICL S (D)" required />
                        <FormItem name="planIclC" label="Plan ICL C (D)" required />
                        {/* <FormItem name="planIclAx" label="Plan ICL Ax" required /> */}
                        <FormItem name="sia" label="SIA (D)" required />
                        <FormItem name="siaAx" label="SIA Ax" required />
                    </Row>
                </Form>
                {data && (
                    <div className="calc-result">
                        <Result
                            data={data}
                            dataKeys={{
                                iclS: "ICL S (D)",
                                iclC: "ICL C (D)",
                                iclAx: "ICL Ax",
                                estiVault: 'Esti Vault (mm)',
                                resiDualS: 'Residual S (D)',
                                resiDualC: 'Residual C (D)',
                                resiDualA: 'Residual Ax'
                            }}
                        />
                    </div>
                )}
            </div>
            <P id="calc.icl.instructions" />
            <P id="calc.icl.notes" />
        </Fragment>
    );
}
