import { useLocale } from "@/locale";
import { ConfigProvider } from "antd-mobile";
import enUS from 'antd-mobile/es/locales/en-US';
import zhCN from 'antd-mobile/es/locales/zh-CN';
import { PropsWithChildren } from "react";
import StoreProvider from '@/privider';

const LOCALE = {
    zhCN,
    enUS,
}

const AppProvider: React.FC<PropsWithChildren> = (props) => {
    const [locale] = useLocale();

    return <StoreProvider>
        <ConfigProvider locale={LOCALE[locale]}>
            {props.children}
        </ConfigProvider>
    </StoreProvider>
}

export default AppProvider;
