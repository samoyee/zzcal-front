import { message, Row } from "antd";
import calcApi from "api/calc";
import React, { Fragment, useState } from "react";
import { useIntl } from "react-intl";
import P from "../modules/CalcP";
import { Form, FormItem } from "../modules/Form";
import Result from "../modules/Result";

export default function VR_PRO() {
    const intl = useIntl();
    const [data, setData] = useState(null);

    const onCalc = async (formData) => {
        try {
            const { data } = await calcApi("formulavrpro")(formData);
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
            <h2>{intl.formatMessage({ id: "calc.vr_pro.name" })}</h2>
            <div className="calc-form-wrapper">
                <Form onCalc={onCalc} onReset={onReset}>
                    <Row gutter={24}>
                        <FormItem name="opicZone" label="Opic Zone" required />
                        <FormItem name="c7" label="C7" required />
                        <FormItem name="c8" label="C8" required />
                        <FormItem name="c11" label="C11" required />
                        <FormItem name="c12" label="C12" required />
                        <FormItem name="c13" label="C13" required />
                    </Row>
                    <Row gutter={24}>
                        <FormItem name="maniSph" label="Mani Sph" required />
                        <FormItem name="maniCyl" label="Mani Cyl" required />
                        <FormItem name="maniCylAxis" label="Mani Cyl Axis" required />
                    </Row>
                </Form>
                {data && (
                    <div className="calc-result">
                        <Result
                            data={data}
                            dataKeys={{
                                correctSph: "Correct Sph",
                                correctCyl: "Correct Cyl",
                                correctCylAxis: "Correct Cyl Axis",
                            }}
                        />
                    </div>
                )}
            </div>
            <P id="calc.vr_pro.instructions" />
        </Fragment>
    );
}
