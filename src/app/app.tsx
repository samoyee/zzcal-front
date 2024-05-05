import { useLocale } from "@/locale";
import router from "@/app/router";
import { TourProvider } from "@reactour/tour";
import { ConfigProvider } from "antd-mobile";
import zhCN from 'antd-mobile/es/locales/zh-CN'
import enUS from 'antd-mobile/es/locales/en-US'
import { RouterProvider } from "react-router";

const LOCALE = {
    zhCN,
    enUS,
}

const App: React.FC = () => {
    const [locale] = useLocale();

    return <TourProvider
        steps={[]}
        showBadge={false}
        showDots={false}
    >
        <ConfigProvider locale={LOCALE[locale]}>
            <RouterProvider router={router} />
        </ConfigProvider>
    </TourProvider>
}

export default App;