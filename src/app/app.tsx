import Provider from "@/app/components/provider";
import router from "@/app/router";
import { useEffect } from "react";
import { RouterProvider } from "react-router";



const App: React.FC = () => {

    useEffect(() => {
        const doc = window.document;
        const docEl = doc.documentElement;
        let metaEl = doc.querySelector('meta[name="viewport"]');
        if (!metaEl) {
            metaEl = doc.createElement('meta');
            metaEl.setAttribute('name', 'viewport');
            document.head.appendChild(metaEl);
        }
        let dpr: number = 1;
        let scale: number = 1;
        let timer: NodeJS.Timeout;

        const isIPhone = window.navigator.appVersion.match(/iphone/gi);
        if (isIPhone) {
            dpr = window.devicePixelRatio >= 2 ? 2 : 1;
        } else {
            dpr = 1;
        }
        scale = 1 / dpr;
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        docEl.setAttribute('data-dpr', `${dpr}`);

        function refreshRem() {
            let width = docEl.getBoundingClientRect().width;
            const height = docEl.getBoundingClientRect().height;
            if (width / dpr > 540) {
                if (width < height) {  // 竖屏
                    width = width * dpr;   // 大于540也按实际页面大小
                }
                else {  // 横屏
                    width = 540 * dpr;
                }
            }
            const rem = width / 10;
            docEl.style.fontSize = rem + 'px';
        }

        window.addEventListener('resize', function () {
            clearTimeout(timer);
            timer = setTimeout(refreshRem, 300);
        }, false);
        window.addEventListener('pageshow', function (e) {
            if (e.persisted) {
                clearTimeout(timer);
                timer = setTimeout(refreshRem, 300);
            }
        }, false);

        if (doc.readyState === 'complete') {
            doc.body.style.fontSize = 12 * dpr + 'px';
        } else {
            doc.addEventListener('DOMContentLoaded', function () {
                doc.body.style.fontSize = 12 * dpr + 'px';
            }, false);
        }

        refreshRem();
    }, [])

    return <Provider>
        <RouterProvider router={router} />
    </Provider>
}

export default App;