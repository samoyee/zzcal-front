import { getLocale } from "./locale";
import { ZzcalError } from './error';

interface IService {
    url: string;
    method: 'POST' | 'GET';
    data?: unknown;
    query?: Record<string, string>
    headers?: Record<string, string>
}

async function service<T>({
    url,
    method,
    data,
    query,
    headers
}: IService): Promise<T> {
    const params = new URLSearchParams();
    for (const key in query) {
        params.set(key, query[key]);
    }
    if (params.size) {
        url += `${url}?${params.toString()}`
    }
    url = `/api${url}`;
    const contentType = headers?.['content-type'] || headers?.['Content-Type'] || headers?.contentType || headers?.ContentType
    const response = await fetch(url, {
        method,
        body: JSON.stringify(data),
        headers: {
            ...headers,
            'content-type': contentType || 'application/json',
        }
    })
    if (response.status >= 500) {
        throw new Error(getLocale('service')('serverError'));
    } else if (response.status >= 400) {
        throw new Error(getLocale('service')('requestError'));
    }
    const json = await response.json();
    if (!json.success) {
        throw new ZzcalError(json.code, json.error);
    }
    if (json.type === 0) return json.data;
    throw json.msg;
}

export function post<T>(args: Omit<IService, 'method'>) {
    return service<T>({ ...args, method: 'POST' })
}

export function get<T>(args: Omit<IService, 'method'>) {
    return service<T>({ ...args, method: 'GET' })
}
