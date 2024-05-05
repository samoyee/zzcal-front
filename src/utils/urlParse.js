import { match } from "path-to-regexp";

export default function urlParse(pattern, url) {
    const _match = match(pattern, { decode: decodeURIComponent });
    const res = _match(url);
    return res.params;
}
