import React from 'react';
import FormulaForm from '@/pc/components/formula-form';
import { useGetLocale } from '@/locale';
import { useMergedState } from 'rc-util';
import { Form, Upload } from 'antd';
import { DeleteOutlined, FileOutlined, InboxOutlined } from '@ant-design/icons';
import './index.less';
import { post } from '@/service';
import { auth } from '@/auth';
import dayjs from 'dayjs';

export const sendPayment = async (outTradeNo: string, type: string) => {
    const data = await post({ url: '/pay/pay', data: { outTradeNo, type } });
    const dom = document.createElement("div");
    document.body.append(dom);
    dom.innerHTML = (data as string)
    const forms = dom.getElementsByTagName("punchout_form");
    if (forms?.length) {
        const form = forms[0] as HTMLFormElement;
        form.setAttribute("target", "_blank");
        form.submit();
        dom.remove();
    }
};

export const getPayStatus = (outTradeNo: string, delay = 3000) => {
    return new Promise((resolve, reject) => {
        if (!outTradeNo) reject("订单号不为空");
        let timer: number;
        function loop() {
            if (timer) clearTimeout(timer);
            post({
                url: '/pay/query',
                data: outTradeNo
            })
                .then(data => {
                    const { status } = data as any;
                    if (status === "WAIT_BUYER_PAY") timer = setTimeout(loop, delay);
                    else if (status === "TRADE_SUCCESS") resolve(status);
                    else reject('支付失败');
                })
                .catch(() => reject('支付失败'));
        }
        loop();
    });
};

const Formula: React.FC = () => {
    const getLocale = useGetLocale('zziolpro')
    return <FormulaForm
        title={getLocale('title')}
        description={getLocale('description')}
        request={async (data) => {
            const formData = new FormData();
            for (let key in data) {
                formData.append(key, data[key])
            }
            const userId = auth.getToken();
            const outTradeNo = dayjs().format("YYYYMMDDHHmmssSSS");
            sendPayment(outTradeNo, 'IOL');
            formData.append('userId', `${userId || ''}`);
            formData.append('type', "IOL");
            const result = await post({
                url: '/pay/fileUpload',
                data: formData,
                headers: {
                    'content-type': "multipart/form-data"
                }
            })
            console.log(result);
        }}
    >
        <Form.Item name="file" rules={[{ required: true }]}>
            <File />
        </Form.Item>
    </FormulaForm>
}

export default Formula;

const File: React.FC<{ value?: File; onChange?: (value?: File) => void }> = (props) => {
    const [value, setValue] = useMergedState(undefined, {
        value: props.value,
        onChange(value) {
            props.onChange?.(value);
        }
    })
    return <Upload.Dragger
        showUploadList={false}
        beforeUpload={() => {
            return false;
        }}
        onChange={({ file }) => {
            setValue(file as unknown as File);
        }}
        accept='.zcs'
        headers={{
            "Content-Type": "multipart/form-data",
        }}
    >
        {
            value ?
                <div
                    className='zcs-file'
                    onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        setValue(undefined);
                    }}>
                    <FileOutlined className='zcs-file-icon' />
                    <div className='zcs-file-text'>.zcs</div>
                    <div className='zcs-file-close-mask'>
                        <DeleteOutlined className='zcs-file-close' />
                    </div>
                </div> :
                <>
                    <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                </>
        }
    </Upload.Dragger>

}