import { message, Row } from "antd";
import calcApi from "api/calc";
import { sendPayment } from 'api/pay';
import moment from "moment";
import React, { Fragment, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import P from "../modules/CalcP";
import { Form, FormItem } from "../modules/Form";
import Result from "../modules/Result";

export default function IOL_PLUS() {
    const intl = useIntl();
    const [data, setData] = useState(null);
    const dispatch = useDispatch();
    const { data: user } = useSelector(state => state.user);
    
    const onCalc = async (formData) => {
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
            await sendPayment(outTradeNo, 'IOLPLUS');
            dispatch({ type: '@Pay/PAY_SUCCESS' });
            formData.outTradeNo = outTradeNo;
            const { data } = await calcApi("zziolplus")(formData);
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
            <h2>{intl.formatMessage({ id: "calc.iol_plus.name" })}</h2>
            <div className="calc-form-wrapper">
                <Form
                    initialValues={{
                        ct: 500,
                        lt: 5,
                    }}
                    onCalc={onCalc}
                    onReset={onReset}
                >
                    <Row gutter={24}>
                        <FormItem name="aConstant" label="A Constant" required />
                        <FormItem name="targetSe" label="Target SE" required />
                        <FormItem name="ct" label="CT (μm)" required />
                        <FormItem name="ac" label="AC (mm)" required />
                        <FormItem name="kf" label="Kf (D)" required />
                        <FormItem name="kb" label="Kb (D)" required />
                        <FormItem name="cornAsti" label="Corn Asti (D)" required />
                        <FormItem name="al" label="AL (mm)" required />
                        <FormItem name="lt" label="LT (mm)" required />
                    </Row>
                </Form>
                {data && (
                    <div className="calc-result">
                        <Result
                            data={data}
                            dataKeys={{
                                iol: "IOL (D)",
                            }}
                        />
                    </div>
                )}
            </div>
            <P id="calc.iol_plus.instructions" />
            <P id="calc.iol_plus.notes" />
            <P id="calc.iol_plus.rawdata" />
            <P id="calc.iol_plus.pay" />
        </Fragment>
    );
}
