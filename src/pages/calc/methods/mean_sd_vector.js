import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { message, Row, Upload } from "antd";
import calcApi, { readMeanXlsxFile } from "api/calc";
import React, { Fragment, useRef, useState } from "react";
import { useIntl } from "react-intl";
import P from "../modules/CalcP";
import { Form, FormItem, FormList } from "../modules/Form";
import Result from "../modules/Result";

const layout = {
    span: 12,
    xs: 12,
    sm: 7,
};

export default function MEAN_SD_VECTOR() {
    const intl = useIntl();
    const form = useRef();
    const [data, setData] = useState(null);

    const onCalc = async (formData) => {
        try {
            const { data } = await calcApi("zzmeansdvector")(formData);
            setData({ ...data, ...formData });
        } catch (e) {
            setData(null);
            message.error(intl.formatMessage({ id: "text.systemError" }));
        }
    }

    const onReset = () => {
        setData(null);
    }

    function upload({ file }) {
        readMeanXlsxFile(file).then(({ result }) => {
            const { zzMeanInfos } = result;
            form.setFieldsValue({ zzMeanInfos });
        }).catch(e => { })
    }
    return (
        <Fragment>
            <h2>{intl.formatMessage({ id: "calc.mean_sd_vector.name" })}</h2>
            <div className="calculate-mean-tip">
                您还可以从模板文件导入参数（<a href="/file/zzmean.xlsx" target="_blank">zz_mean.xlsx</a>），点击
                <Upload customRequest={upload} showUploadList={false}>
                    <a>上传</a>
                </Upload>
            </div>
            <div className="calc-form-wrapper">
                <Form
                    ref={form}
                    onCalc={onCalc}
                    onReset={onReset}
                    initialValues={{
                        zzMeanInfos: [{ sph: null, cyl: null, axis: null }],
                    }}
                >
                    <FormList name="zzMeanInfos">
                        {(fields, { add, remove }) => {
                            return <Fragment>
                                {fields.map((field, index) => <Row key={field.key} gutter={24}>
                                    <FormItem
                                        name={[field.name, "sph"]}
                                        fieldKey={[field.fieldKey, "sph"]}
                                        required
                                        label="Sph"
                                        layout={layout}
                                    />
                                    <FormItem
                                        name={[field.name, "cyl"]}
                                        fieldKey={[field.fieldKey, "cyl"]}
                                        required
                                        label="Cyl"
                                        layout={layout}
                                    />
                                    <FormItem
                                        name={[field.name, "axis"]}
                                        fieldKey={[field.fieldKey, "axis"]}
                                        required
                                        label="Axis"
                                        layout={layout}
                                    />
                                    {fields.length > 1 && (
                                        <MinusCircleOutlined
                                            className="calc-form-icon"
                                            onClick={() => remove(field.name)}
                                        />
                                    )}
                                    {index === fields.length - 1 && (
                                        <PlusCircleOutlined
                                            className="calc-form-icon"
                                            onClick={() => add()}
                                        />
                                    )}
                                </Row>)}
                            </Fragment>
                        }}
                    </FormList>
                </Form>
                {data && (
                    <div className="calc-result">
                        <Result
                            data={data}
                            dataKeys={{
                                meanSph: "Mean Sph",
                                meanCyl: "Mean Cyl",
                                meanAxis: "Mean Axis",
                                sdSph: "Sd Sph",
                                sdCyl: "Sd Cyl",
                            }}
                        />
                    </div>
                )}
            </div>
            <P id="calc.mean_sd_vector.instructions" />
        </Fragment>
    );
}
