import { message, Row, Radio } from "antd";
import calcApi from "api/calc";
import DataChart from "components/Chart/DataChart";
import React, { Fragment, useState } from "react";
import { useIntl } from "react-intl";
import P from "../modules/CalcP";
import { Form, FormItem } from "../modules/Form";
import Result from "../modules/Result";
import Help from "../../../components/Help";

export default function AR() {
  const intl = useIntl();
  const [data, setData] = useState(null);
  const [mode, setMode] = useState("not");

  const onCalc = async (formData) => {
    try {
      const { data } = await calcApi("zzar2")(formData);
      setData(data);
    } catch (e) {
      setData(null);
      message.error(intl.formatMessage({ id: "text.systemError" }));
    }
  };

  const onReset = () => {
    setData(null);
  };

  return (
    <Fragment>
      <h2>{intl.formatMessage({ id: "calc.ar.name" })}
        <Help urls={[
          'https://mskmanager.oss-cn-hangzhou.aliyuncs.com/zzcal_help/ar-1.png',
          'https://mskmanager.oss-cn-hangzhou.aliyuncs.com/zzcal_help/ar-2.png',
          'https://mskmanager.oss-cn-hangzhou.aliyuncs.com/zzcal_help/ar-3.png'
        ]} /></h2>
      <div className="calc-form-wrapper">
        <div style={{ marginLeft: 50 }}>
          <h4>Corneal posterior surface astigmatism available or not</h4>
          <Radio.Group
            style={{ marginBottom: 20 }}
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <Radio value="available">Available</Radio>
            <Radio value="not">Not</Radio>
          </Radio.Group>
        </div>
        <Form
          onCalc={onCalc}
          onReset={onReset}
          initialValues={{ resLensC: 20 }}
        >
          <Row gutter={24}>
            <FormItem name="maniSph" label="Mani S (D)" required />
            <FormItem name="maniCyl" label="Mani C (D)" required />
            <FormItem name="maniCylAxis" label="Mani Ax" required />
            <FormItem name="kf" label="Kf (D)" required />
            <FormItem
              name="ks"
              label="Ks (D)"
              required
              dependencies={["kf"]}
              rules={[
                { required: true },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (value && getFieldValue("kf") <= value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Ks >= Kf"));
                  },
                }),
              ]}
            />
            <FormItem name="kf2" label="Kf Ax" required />
            {mode === "available" && [
              <FormItem
                name="cornPC"
                label="Corn-P C (D)"
                required
                key="cornPC"
              />,
              <FormItem
                name="cornPAx"
                label="Corn-P Ax"
                required
                key="cornPAx"
              />,
            ]}
            <FormItem name="tmrc" label="TMR C (D)" required max={0} />
            <FormItem name="tmra" label="TMR Ax" required />
            <FormItem name="resLensC" label="Res-Lens C (%)" required />
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
                  [+data.hoAsC, data.hoAsA, "HOAs Astigmatism"],
                  [+data.corneaC, data.corneaA, "Corneal Astigmatism"],
                  [+data.lensC, data.lensA, "Lens Astigmatism"],
                  [+data.arCyl, data.arAxis, "AR"],
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
