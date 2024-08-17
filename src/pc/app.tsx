import Provider from "@/pc/components/provider";
import router from "@/pc/router";
import { Modal } from "antd";
import { useEffect } from "react";
import { RouterProvider } from "react-router";

const App: React.FC = () => {

    useEffect(() => {
        const ua = window.navigator.userAgent;
        if (!/Chrome/.test(ua)) {
            Modal.info({
                closable: false,
                maskClosable: false,
                centered: true,
                title: '当前浏览器无法不支持，请下载最新版的（Chrome浏览器）',
                okText: '下载',
                onOk() {
                    window.open('https://www.google.cn/intl/zh-CN/chrome/?');
                },
                cancelText: '已完成安装，重新登录',
            })
        }

    }, []);

    return <Provider>
        <RouterProvider router={router} />
    </Provider>
}

export default App;