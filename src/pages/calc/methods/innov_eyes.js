import { message, Row } from "antd";
import calcApi from "api/calc";
import React, { Fragment, useRef, useState } from "react";
import { useIntl } from "react-intl";
import P from "../modules/CalcP";
import { Form, FormItem } from "../modules/Form";
import Result from "../modules/Result";

export default function EX_500_OPMI() {
    const intl = useIntl();
    const [data, setData] = useState(null);
    const formRef = useRef();

    const onCalc = async (formData) => {
        try {
            const { data } = await calcApi("zzinnoveyes")(formData);
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
            <h2>{intl.formatMessage({ id: "calc.innov_eyes.name" })}</h2>
            <div className="calc-form-wrapper">
                <Form ref={formRef} onCalc={onCalc} onReset={onReset} initialValues={{
                    refrectionb: -0.25,
                    refrectionc: 0
                }}>
                    <Row gutter={24}>
                        <FormItem name="age" label="Age" required
                            onChange={(age) => {
                                const form = formRef.current;
                                const manis = form.getFieldValue('manis') || 0;
                                if (age >= 40) {
                                    form.setFieldsValue({
                                        refrectiona: -0.1,
                                    })
                                } else if (age >= 25) {
                                    form.setFieldsValue({
                                        refrectiona: ((40 - age) * 0.025).toFixed(2)
                                    })
                                } else {
                                    form.setFieldsValue({
                                        refrectiona: ((40 - age) * 0.025 - manis * 0.025).toFixed(2)
                                    })
                                }
                            }} />
                        <FormItem name="manis" label="Mani S (D)" required
                            onChange={(manis) => {
                                const form = formRef.current;
                                const age = form.getFieldValue('age') || 0;
                                if (age >= 40) {
                                    form.setFieldsValue({
                                        refrectiona: -0.1,
                                    })
                                } else if (age >= 25) {
                                    form.setFieldsValue({
                                        refrectiona: ((40 - age) * 0.025).toFixed(2)
                                    })
                                } else {
                                    form.setFieldsValue({
                                        refrectiona: ((40 - age) * 0.025 - manis * 0.025).toFixed(2)
                                    })
                                }
                            }}
                        />
                        <FormItem name="manic" label="Mani C (D)" required />
                        <FormItem name="mms" label="4mm S" required />
                        <FormItem name="mmc" label="4mm C" required />
                        <FormItem name="mmax" label="4mm Ax" required />
                        <FormItem name="defdetails" label="Def-Detail S" required />
                        <FormItem name="defdetailc" label="Def-Detail C" required />
                        <FormItem name="defdetailax" label="Def-Detail Ax" required />
                        <FormItem name="refrectiona" label="Target Refrection S" required />
                        <FormItem name="refrectionb" label="Target Refrection C" required />
                        <FormItem name="refrectionc" label="Target Refrection Ax" required />
                    </Row>
                </Form>
                {data && (
                    <div className="calc-result">
                        <Result
                            data={data}
                            dataKeys={{
                                treats: "Treat S",
                                treatc: "Treat C",
                                treatax: "Treat Ax",
                                details: "Detail S",
                                detailc: "Detail C",
                                detailax: "Detail Ax"
                            }}
                        />
                    </div>
                )}
            </div>
            <P id="calc.innov_eyes.instructions" />
        </Fragment>
    );
}
