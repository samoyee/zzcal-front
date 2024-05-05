import http from "utils/http";

export default function (method) {
    return http(`/calculate/${method}`).post;
}

export const readMeanXlsxFile = http("/calculate/zzmeanexcel", {
    headers: {
        "Content-Type": "multipart/form-data",
    },
}).post;
