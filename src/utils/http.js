const isDev = process.env.NODE_ENV === "development";

import axios from "axios";

function request({ baseURL, timeout, headers }) {
    return axios.create({
        baseURL,
        timeout,
        headers: {
            ...headers,
            // TOKEN CUSTOM-HEADER ...
        },
    });
}

function checkStatus({ status, data }) {
    if (status === 200) {
        if (data.type === 0) return { data: data.data, msg: data.msg };
        throw new Error(data.msg);
    }
    throw new Error("response.msg.systemError");
}

function debugError(e) {
    if (isDev) console.error(e);
    throw e;
}

function filterResponse(promise, optionCheckStatus) {
    return promise
        .then((response) => {
            if (optionCheckStatus) return checkStatus(response);
            return response;
        })
        .catch((err) => {
            if (optionCheckStatus) return debugError(err);
            throw err;
        });
}

export default function http(url, options = {}) {
    options = Object.assign({ checkStatus: true }, options);
    const { headers, params, ...restOptions } = options;
    const instance = request({
        baseURL: "/",
        timeout: 30000,
        headers: { ...headers, "Content-Type": "application/json" },
    });
    return {
        get(query) {
            return filterResponse(
                instance.request({
                    ...restOptions,
                    method: "get",
                    url,
                    params: {
                        ...params,
                        ...query,
                    },
                }),
                options.checkStatus
            );
        },
        post(data, query) {
            return filterResponse(
                instance.request({
                    ...restOptions,
                    method: "post",
                    url,
                    data,
                    params: {
                        ...params,
                        ...query,
                    },
                }),
                options.checkStatus
            );
        },
    };
}
