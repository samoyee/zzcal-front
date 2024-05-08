import { LocaleProvider, useLocale } from "@/locale";
import { ConfigProvider } from "antd";
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import { PropsWithChildren } from "react";

const LOCALE = {
    zhCN,
    enUS,
}

const Provider: React.FC<PropsWithChildren> = (props) => {
    const [locale] = useLocale();

    return <LocaleProvider>
        <ConfigProvider locale={LOCALE[locale]} wave={{ disabled: true }}>
            {props.children}
        </ConfigProvider>
    </LocaleProvider>
}

export default Provider;