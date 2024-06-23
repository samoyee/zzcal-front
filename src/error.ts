export class ZzcalError extends Error {
    code: string;
    error: unknown;

    constructor(code: string, error: unknown) {
        super();
        this.code = code;
        this.error = error;
    }
}