import { useLocale } from "@/locale";
import router from "@/pc/router";
import { TourProvider } from "@reactour/tour";
import { ConfigProvider } from "antd";
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
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
        <ConfigProvider
            locale={LOCALE[locale]}
            wave={{ disabled: true }}
            theme={{
                token: {
                    colorPrimary: '#5c8cfe',
                    colorPrimaryHover: '#4979ec',
                    colorPrimaryActive: '#4979ec',
                },
                components: {
                    Modal: {
                        colorInfo: '#5c8cfe'
                    },
                    Button: {
                        primaryShadow: 'none',
                        primaryColor: '#fff'
                    },
                    Input: {
                        activeBg: '#f4f8f9',
                        activeShadow: 'none',
                        activeBorderColor: '#f4f8f9',
                        hoverBg: '#f4f8f9',
                        hoverBorderColor: '#f4f8f9',
                        errorActiveShadow: 'none',
                        warningActiveShadow: 'none',
                        colorBgContainer: '#f4f8f9',
                        colorBorder: '#f4f8f9'
                    },
                }
            }}>
            <RouterProvider router={router} />
        </ConfigProvider>
    </TourProvider>
}

export default App;