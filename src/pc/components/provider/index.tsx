import { LocaleProvider, useLocale } from "@/locale";
import { ConfigProvider } from "antd";
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import { useEffect, type PropsWithChildren } from "react";
import dayjs from "dayjs";
import 'dayjs/locale/en';
import 'dayjs/locale/zh-cn';

const LOCALE = {
    zhCN,
    enUS,
}

const DAY_LOCALE = {
    zhCN: 'zh-cn',
    enUS: 'en'
}

const Provider: React.FC<PropsWithChildren> = (props) => {
    return <LocaleProvider>
        <AntdProvider>
            {props.children}
        </AntdProvider>
    </LocaleProvider>
}

export default Provider;

const AntdProvider: React.FC<PropsWithChildren> = (props) => {
    const [locale] = useLocale();

    useEffect(() => {
        dayjs.locale(DAY_LOCALE[locale])
    }, [locale]);

    return <ConfigProvider locale={LOCALE[locale]} wave={{ disabled: true }}>
        {props.children}
    </ConfigProvider>
}