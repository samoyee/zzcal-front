import { message, Row } from "antd";
import calcApi from "api/calc";
import React, { Fragment, useState } from "react";
import { useIntl } from "react-intl";
import P from "../modules/CalcP";
import { Form, FormItem } from "../modules/Form";
import Result from "../modules/Result";

export default function LSA() {
    const intl = useIntl();
    const [data, setData] = useState(null);

    const onCalc = async (formData) => {
        try {
            const { data } = await calcApi("zzcalqd")(formData);
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
            <h2>{intl.formatMessage({ id: "calc.qd.name" })}</h2>
            <div className="calc-form-wrapper">
                <Form onCalc={onCalc} onReset={onReset} initialValues={{
                    opicZone: 5,
                    lsa: -1,
                    e: 0
                }}>
                    <Row gutter={24}>
                        <FormItem name="k" label="K (D)" required />
                        <FormItem name="correctSd" label="Correct SD (D)" required />
                        <FormItem name="e" label="e" required />
                        <FormItem name="targetQ" label="Target Q" required />
                    </Row>
                </Form>
                {data && (
                    <div className="calc-result">
                        <Result
                            data={data}
                            dataKeys={{
                                qd: 'Q.D. (D)',
                                targetD: 'Target D',
                            }}
                        />
                    </div>
                )}
            </div>
            <P id="calc.qd.instructions" />
            <P id="calc.qd.notes" />
        </Fragment>
    );
}
