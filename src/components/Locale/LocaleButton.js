import { Button } from "antd";
import React from "react";
import { useSelector } from "react-redux";

export default function LocaleButton() {
    const lang = useSelector((state) => state.locale.lang);
    function go() {
        let { pathname } = location;
        pathname = pathname.replace(lang, lang === "en_US" ? "zh_CN" : "en_US");
        location.href = pathname;
    }
    return (
        <Button size="small" onClick={go}>
            {lang === "en_US" ? "中文" : "English"}
        </Button>
    );
}
