import { Button, Col, Form, Input, Row, Upload, message } from "antd";
import React, { Fragment, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import P from "../modules/CalcP";
import { uploadZcsFile, sendPayment } from 'api/pay';
import moment from "moment";
import Help from "../../../components/Help";

export default function IOL_PRO() {
    const intl = useIntl();
    const { data: user } = useSelector(state => state.user);
    const lang = useSelector((state) => state.locale);
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    const upload = async (formData) => {
        try {
            // 登录流程
            if (!user) {
                dispatch({ type: '@User/OPEN_DIALOG' });
                message.info(intl.formatMessage({ id: 'text.noLogin' }));
                return;
            }
            // 付费流程
            const outTradeNo = moment().format("YYYYMMDDHHmmssSSS");
            dispatch({ type: '@Pay/PAYING' });
            await sendPayment(outTradeNo, 'IOL');
            dispatch({ type: '@Pay/PAY_SUCCESS' });
            formData.outTradeNo = outTradeNo;
            formData.userId = user.id;
            formData.type = "IOL";
            uploadZcsFile(formData);
        } catch (e) {
            console.error(e);
            message.error(intl.formatMessage({ id: "text.systemError" }));
        }
    }

    const beforeUpload = (file) => {
        setFile(file);
        return false;
    }

    return (
        <Fragment>
            <h2>{intl.formatMessage({ id: "calc.iol_pro.name" })}
            <Help urls={[
                'https://mskmanager.oss-cn-hangzhou.aliyuncs.com/zzcal_help/iol_old-1.png'
            ]} /></h2>
            <div className="calc-form-wrapper">
                <Form onFinish={upload}>
                    <Row gutter={24}>
                        <Col span={{ sm: 5 }}>
                            <Form.Item
                                name="file"
                                valuePropName="fileList"
                                getValueFromEvent={(e) => {
                                    if (Array.isArray(e)) {
                                        return e;
                                    }
                                    return e && e.fileList;
                                }}
                                rules={[
                                    {
                                        required: true,
                                        message: intl.formatMessage({ id: "form.rules.required.upload" }),
                                    },
                                    () => ({
                                        validator(_, files) {
                                            const file = files && files[0];
                                            if (!file) return Promise.resolve();
                                            const suffix = file.name.slice(file.name.lastIndexOf("."));
                                            if (suffix != ".zcs")
                                                return Promise.reject(
                                                    intl.formatMessage({ id: "form.rules.upload.zcsError" })
                                                );
                                            return Promise.resolve();
                                        },
                                    }),
                                ]}
                            >
                                <Upload beforeUpload={beforeUpload} showUploadList={false}>
                                    <Input readOnly value={file?.name} />
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col span={{ sm: 4 }}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">{intl.formatMessage({ id: 'btn.upload' })}</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Button type="link" href={`/user/${lang}/list`}>{intl.formatMessage({ id: 'btn.searchResult' })}</Button>
            </div>
            <P id="calc.iol_pro.instructions" />
            <P id="calc.iol_pro.notes" />
            <P id="calc.iol_pro.rawdata" />
            <P id="calc.iol_pro.pay" />
        </Fragment>
    );
}
