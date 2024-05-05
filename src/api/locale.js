import http from "utils/http";

export function getEN() {
    return http("/i18n/en_US.json", {
        checkStatus: false,
        headers: {
            "Cache-Control": "max-age=3600",
        },
    })
        .get()
        .then(({ data }) => data);
}

export function getCN() {
    return http("/i18n/zh_CN.json", {
        checkStatus: false,
        headers: {
            "Cache-Control": "max-age=3600",
        },
    })
        .get()
        .then(({ data }) => data);
}
