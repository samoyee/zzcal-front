import { LocaleProvider, useLocale } from "@/locale";
import { ConfigProvider } from "antd-mobile";
import enUS from 'antd-mobile/es/locales/en-US';
import zhCN from 'antd-mobile/es/locales/zh-CN';
import { PropsWithChildren } from "react";

const LOCALE = {
    zhCN,
    enUS,
}

const Provider: React.FC<PropsWithChildren> = (props) => {
    const [locale] = useLocale();

    return <LocaleProvider>
        <ConfigProvider locale={LOCALE[locale]}>
            {props.children}
        </ConfigProvider>
    </LocaleProvider>
}

export default Provider;