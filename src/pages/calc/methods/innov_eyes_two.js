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
            const { data } = await calcApi("zzinnovEyestwo")(formData);
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
                    inducingb: -0.25,
                    inducingc: 0
                }}>
                    <Row gutter={24}>
                        <FormItem name="yearofb" label="Year of B" required
                            onChange={(yearofb) => {
                                console.log(yearofb);
                                const form = formRef.current;
                                const manis = form.getFieldValue('manis') || 0;
                                const year = yearofb > 100 ? yearofb - parseInt(yearofb / 100) * 100 : yearofb;
                                const cYear = new Date().getFullYear();
                                const age = (cYear - year) - parseInt((cYear - year) / 100) * 100
                                console.log(age);
                                if (age >= 40) {
                                    form.setFieldsValue({
                                        age,
                                        inducinga: -0.1,
                                    })
                                } else if (age >= 25) {
                                    form.setFieldsValue({
                                        age,
                                        inducinga: ((40 - age) * 0.025).toFixed(2)
                                    })
                                } else {
                                    form.setFieldsValue({
                                        age,
                                        inducinga: ((40 - age) * 0.025 - manis * 0.025).toFixed(2)
                                    })
                                }
                            }}
                        />
                        <FormItem name="age" label="Age" disabled />
                        <FormItem name="manis" label="Mani S (D)" required
                            onChange={(manis) => {
                                const form = formRef.current;
                                const yearofb = form.getFieldValue('yearofb') || 0;
                                const year = yearofb > 100 ? yearofb - parseInt(yearofb / 100) * 100 : yearofb;
                                const cYear = new Date().getFullYear();
                                const age = (cYear - year) - parseInt((cYear - year) / 100) * 100

                                if (age >= 40) {
                                    form.setFieldsValue({
                                        age,
                                        inducinga: -0.1,
                                    })
                                } else if (age >= 25) {
                                    form.setFieldsValue({
                                        age,
                                        inducinga: ((40 - age) * 0.025).toFixed(2)
                                    })
                                } else {
                                    form.setFieldsValue({
                                        age,
                                        inducinga: ((40 - age) * 0.025 - manis * 0.025).toFixed(2)
                                    })
                                }
                            }} />
                        <FormItem name="manic" label="Mani C (D)" required />
                        <FormItem name="mms" label="4mm S" required />
                        <FormItem name="mmc" label="4mm C" required />
                        <FormItem name="mmax" label="4mm Ax" required />
                        <FormItem name="defdetails" label="Def-Detail S" required />
                        <FormItem name="defdetailc" label="Def-Detail C" required />
                        <FormItem name="defdetailax" label="Def-Detail Ax" required />
                        <FormItem name="inducinga" label="Inducing Refrection S" required />
                        <FormItem name="inducingb" label="Inducing Refrection C" required />
                        <FormItem name="inducingc" label="Inducing Refrection Ax" required />
                    </Row>
                </Form>
                {data && (
                    <div className="calc-result">
                        <Result
                            data={data}
                            dataKeys={{
                                age: 'Age',
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
