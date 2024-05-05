interface IService {
    url: string;
    method: 'POST' | 'GET';
    data?: unknown;
    query?: Record<string, string>
    headers?: Record<string, string>
}

async function service({
    url,
    method,
    data,
    query,
    headers
}: IService): Promise<unknown> {
    const params = new URLSearchParams();
    for (const key in query) {
        params.set(key, query[key]);
    }
    if (params.size) {
        url += `${url}?${params.toString()}`
    }
    url = `/api${url}`
    const contentType = headers?.['content-type'] || headers?.['Content-Type'] || headers?.contentType || headers?.ContentType
    const response = await fetch(url, {
        method,
        body: JSON.stringify(data),
        headers: {
            ...headers,
            'content-type': contentType || 'application/json',
        }
    })
    const json = await response.json();
    if (json.type === 0) return json.data;
    throw new Error(json.msg);
}

export function post(args: Omit<IService, 'method'>) {
    return service({ ...args, method: 'POST' })
}

export function get(args: Omit<IService, 'method'>) {
    return service({ ...args, method: 'GET' })
}