import { message, Row } from "antd";
import calcApi from "api/calc";
import React, { Fragment, useState } from "react";
import { useIntl } from "react-intl";
import P from "../modules/CalcP";
import { Form, FormItem } from "../modules/Form";
import Result from "../modules/Result";
import Help from "../../../components/Help";

export default function IOL_TORIC() {
    const intl = useIntl();
    const [data, setData] = useState(null);

    const onCalc = async (formData) => {
        try {
            const { data } = await calcApi("zzcaltoriciol")(formData);
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
            <h2>{intl.formatMessage({ id: "calc.iol_toric.name" })}<Help urls={[
                'https://mskmanager.oss-cn-hangzhou.aliyuncs.com/zzcal_help/iol_toric-1.png',
                'https://mskmanager.oss-cn-hangzhou.aliyuncs.com/zzcal_help/iol_toric-2.png',
                'https://mskmanager.oss-cn-hangzhou.aliyuncs.com/zzcal_help/iol_toric-3.png'
            ]} /></h2>
            <div className="calc-form-wrapper">
                <Form
                    initialValues={{
                        targetSe: 0,
                        cct: 500,
                        lt: 5,
                    }}
                    onCalc={onCalc}
                    onReset={onReset}
                >
                    <Row gutter={24}>
                        <FormItem name="aConstant" label="A Constant" required />
                        <FormItem name="targetSe" label="Target SE" required />
                        <FormItem name="al" label="AL (mm)" required />
                        <FormItem name="acd" label="ACD (mm)" required />
                        <FormItem name="lt" label="LT (mm)" required />
                        <FormItem name="meanpp" label="Mean PP (D)" required />
                        <FormItem name="cornAsti" label="Corn Asti (D)" required max={0} />
                        <FormItem name="cornAstiAx" label="Corn Asti Ax" required />
                        <FormItem name="sia" label="SIA (D)" required />
                        <FormItem name="siaAx" label="SIA Ax" required />
                        <FormItem name="cct" label="CCT (μm)" required />
                    </Row>
                </Form>
                {data && (
                    <div className="calc-result">
                        <Result
                            data={data}
                            dataKeys={{
                                iolSe: "IOL SE (D)",
                                iolS: "IOL S (D)",
                                iolC: "IOL C (D)",
                                iolAx: "IOL Ax",
                            }}
                        />
                    </div>
                )}
            </div>
            <P id="calc.iol_toric.instructions" />
            <P id="calc.iol_toric.notes" />
        </Fragment>
    );
}
