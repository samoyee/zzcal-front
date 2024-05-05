import { message, Row } from "antd";
import calcApi from "api/calc";
import React, { Fragment, useState } from "react";
import { useIntl } from "react-intl";
import P from "../modules/CalcP";
import { Form, FormItem } from "../modules/Form";
import Result from "../modules/Result";

export default function TICL_ROTATION() {
    const intl = useIntl();
    const [data, setData] = useState(null);

    const onCalc = async (formData) => {
        try {
            const { data } = await calcApi("zzticl")(formData);
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
            <h2>{intl.formatMessage({ id: "calc.ticl_rotation.name" })}</h2>
            <div className="calc-form-wrapper">
                <Form onCalc={onCalc} onReset={onReset}>
                    <Row gutter={24}>
                        <FormItem name="maniS" label="Mani S (D)" required />
                        <FormItem name="maniC" label="Mani C (D)" required />
                        <FormItem name="maniAx" label="Mani Ax" required />
                        <FormItem name="resiSph" label="Residual S (D)" required />
                        <FormItem name="resiCyl" label="Residual C (D)" required />
                        <FormItem name="resiCylAxis" label="Residual Ax" required />
                        <FormItem name="siaD" label="SIA (D)" required />
                        <FormItem name="siaAxis" label="SIA Ax" required />
                    </Row>
                </Form>
                {data && (
                    <div className="calc-result">
                        <Result
                            data={data}
                            dataKeys={{
                                clockwise: 'Clockwise',
                                estimatedS: "Estimated S (D)",
                                estimatedC: "Estimated C (D)",
                                estimatedAx: "Estimated Ax",
                            }}
                        />
                    </div>
                )}
            </div>
            <P id="calc.ticl_rotation.instructions" />
            <P id="calc.ticl_rotation.notes" />
        </Fragment>
    );
}
