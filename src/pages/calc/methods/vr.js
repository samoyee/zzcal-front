import { message, Row, Select } from "antd";
import calcApi from "api/calc";
import DataChart from "components/Chart/DataChart";
import React, { Fragment, useState } from "react";
import { useIntl } from "react-intl";
import P from "../modules/CalcP";
import { Form, FormItem } from "../modules/Form";
import Result from "../modules/Result";

const { Option } = Select;

export default function VR() {
    const intl = useIntl();
    const [data, setData] = useState(null);
    const [version, setVersion] = useState("1.1");

    const onCalc = async (formData) => {
        try {
            const { data } = await calcApi("formulavr")({ ...formData, version });
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
            <h2>
                {intl.formatMessage({ id: "calc.vr.name" })}
                <Select
                    value={version}
                    onChange={(version) => setVersion(version)}
                    style={{ width: 76, marginLeft: 12 }}
                    size="small"
                >
                    <Option value="1.0">v 1.0</Option>
                    <Option value="1.1">v 1.1</Option>
                </Select>
            </h2>
            <div className="calc-form-wrapper">
                <Form onCalc={onCalc} onReset={onReset} initialValues={{ opicZone: 6.5 }}>
                    <Row gutter={24}>
                        <FormItem name="opicZone" label="Opic Zone (mm)" required />
                        <FormItem name="c7" label="C7 (μm)" required />
                        <FormItem name="c8" label="C8 (μm)" required />
                        <FormItem name="c11" label="C11 (μm)" required />
                        <FormItem name="c12" label="C12 (μm)" required />
                        <FormItem name="c13" label="C13 (μm)" required />
                    </Row>
                    <Row gutter={24}>
                        <FormItem name="maniSph" label="Mani S (D)" required />
                        <FormItem name="maniCyl" label="Mani C (D)" required />
                        <FormItem name="maniCylAxis" label="Mani Ax" required />
                    </Row>
                </Form>
                {data && (
                    <div className="calc-result">
                        <Result
                            data={data}
                            dataKeys={{
                                vrSph: "VR S (D)",
                                vrCyl: "VR C (D)",
                                vrAxis: "VR Ax",
                            }}
                        />
                        <DataChart
                            data={
                                data && [
                                    [+data.maniCyl, +data.maniAxis, "Manifest Astigmatism"],
                                    [+data.comaCyl, +data.comaAxis, "COMA Astigmatism"],
                                    [+data.secAstiD2, +data.secAstiD3, "Secondary Astigmatism"],
                                    [+data.vrCyl, +data.vrAxis, "VR"],
                                ]
                            }
                        />
                    </div>
                )}
            </div>
            <P id="calc.vr.instructions" />
            <P id="calc.vr.notes" />
        </Fragment>
    );
}
