import { message, Row } from "antd";
import calcApi from "api/calc";
import DataChart from "components/Chart/DataChart";
import React, { Fragment, useState } from "react";
import { useIntl } from "react-intl";
import P from "../modules/CalcP";
import { Form, FormItem } from "../modules/Form";
import Result from "../modules/Result";

export default function VECTOR_SUM_SUB() {
    const intl = useIntl();
    const [data, setData] = useState(null);

    const onCalc = async (formData) => {
        try {
            const { data } = await calcApi("zzastigmatism")(formData);
            setData({ ...data, ...formData });
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
            <h2>{intl.formatMessage({ id: "calc.vector_sum_sub.name" })}</h2>
            <div className="calc-form-wrapper">
                <Form onCalc={onCalc} onReset={onReset}>
                    <Row gutter={24}>
                        <FormItem layout={{ span: 8 , xs: 24, sm: 8 }} name="sph1" label="Sph A" required />
                        <FormItem layout={{ span: 8 , xs: 24, sm: 8 }} name="cyl1" label="Cyl A" required />
                        <FormItem layout={{ span: 8 , xs: 24, sm: 8 }} name="axis1" label="Axis A" required />
                        <FormItem layout={{ span: 8 , xs: 24, sm: 8 }} name="sph2" label="Sph B" required />
                        <FormItem layout={{ span: 8 , xs: 24, sm: 8 }} name="cyl2" label="Cyl B" required />
                        <FormItem layout={{ span: 8 , xs: 24, sm: 8 }} name="axis2" label="Axis B" required />
                    </Row>
                </Form>
                {data && (
                    <div className="calc-result">
                        <Result
                            data={data}
                            dataKeys={{
                                sph1add2: "Sph A + B",
                                cyl1add2: "Cyl A + B",
                                axis1add2: "Axis A + B",
                                sph1cut2: "Sph A - B",
                                cyl1cut2: "Cyl A - B",
                                axis1cut2: "Axis A - B",
                            }}
                        />
                        <DataChart
                            data={
                                data && [
                                    [+data.cyl1, +data.axis1, "A"],
                                    [+data.cyl2, +data.axis2, "B"],
                                    [+data.cyl1add2, +data.axis1add2, "A + B"],
                                    [+data.cyl1cut2, +data.axis1cut2, "A - B"],
                                ]
                            }
                        />
                    </div>
                )}
            </div>
            <P id="calc.vector_sum_sub.instructions" />
        </Fragment>
    );
}
