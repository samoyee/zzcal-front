import { message, Row } from "antd";
import calcApi from "api/calc";
import DataChart from "components/Chart/DataChart";
import React, { Fragment, useState } from "react";
import { useIntl } from "react-intl";
import P from "../modules/CalcP";
import { Form, FormItem } from "../modules/Form";
import Result from "../modules/Result";

export default function AR() {
    const intl = useIntl();
    const [data, setData] = useState(null);

    const onCalc = async (formData) => {
        try {
            const { data } = await calcApi("zzar")(formData);
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
            <h2>{intl.formatMessage({ id: "calc.ar.name" })}</h2>
            <div className="calc-form-wrapper">
                <Form onCalc={onCalc} onReset={onReset}>
                    <Row gutter={24}>
                        <FormItem name="maniSph" label="Mani S (D)" required />
                        <FormItem name="maniCyl" label="Mani C (D)" required />
                        <FormItem name="maniCylAxis" label="Mani Cyl Ax" required />
                        <FormItem name="kf" label="Kf (D)" required />
                        <FormItem name="ks" label="Ks (D)" required />
                        <FormItem name="kf2" label="Kf Ax" required />
                        <FormItem name="tmrc" label="TMR C (D)" required max={0} />
                        <FormItem name="tmra" label="TMR Ax" required />
                    </Row>
                </Form>
                {data && (
                    <div className="calc-result">
                        <Result
                            data={data}
                            dataKeys={{
                                arSph: "AR S (D)",
                                arCyl: "AR C (D)",
                                arAxis: "AR Ax",
                            }}
                        />
                        <DataChart
                            data={
                                data && [
                                    [+data.maniCyl, +data.maniAxis, "Manifest Astigmatism"],
                                    [+data.postLensCyl, +data.postLensAxis, "Intraocular Astigmatism"],
                                    [+data.tmrCyl, +data.tmrAxis, "TMR Astigmatism"],
                                    [+data.arCyl, +data.arAxis, "AR"],
                                ]
                            }
                        />
                    </div>
                )}
            </div>
            <P id="calc.ar.instructions" />
            <P id="calc.ar.notes" />
        </Fragment>
    );
}
