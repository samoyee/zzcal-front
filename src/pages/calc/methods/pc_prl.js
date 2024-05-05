import { message, Row } from "antd";
import calcApi from "api/calc";
import React, { Fragment, useState } from "react";
import { useIntl } from "react-intl";
import P from "../modules/CalcP";
import { Form, FormItem } from "../modules/Form";
import Result from "../modules/Result";

export default function PC_PRL() {
    const intl = useIntl();
    const [data, setData] = useState(null);

    const onCalc = async (formData) => {
        try {
            const { data } = await calcApi("zzpcprl")(formData);
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
            <h2>{intl.formatMessage({ id: "calc.pc_prl.name" })}</h2>
            <div className="calc-form-wrapper">
                <Form onCalc={onCalc} onReset={onReset} initialValues={{ ct: 500 }}>
                    <Row gutter={24}>
                        <FormItem name="maniS" label="Mani S (D)" required />
                        <FormItem name="maniC" label="Mani C (D)" required />
                        <FormItem name="k" label="K (D)" required />
                        <FormItem name="ct" label="CT (μm)" required />
                        <FormItem name="ac" label="AC (mm)" required />
                    </Row>
                </Form>
                {data && (
                    <div className="calc-result">
                        <Result
                            data={data}
                            dataKeys={{
                                pcPrl: "PC-PRL",
                            }}
                        />
                    </div>
                )}
            </div>
            <P id="calc.pc_prl.instructions" />
            <P id="calc.pc_prl.notes" />
        </Fragment>
    );
}
