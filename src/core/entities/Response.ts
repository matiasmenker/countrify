export type ErrorResponseType = {
    statusCode: number;
    message: string;
};

export class HttpResponse<T> {
    public readonly statusCode: number;
    public readonly message: string;
    public readonly data?: any;

    constructor(statusCode: number, message: string, data?: T) {
        this.statusCode = statusCode;
        this.message = message;
        if (data) {
            this.data = data;
        }
    }

    isError = () => this.statusCode >= 400 && this.statusCode < 500;

    isSuccess = () => !this.isError();

    format = () => JSON.parse(JSON.stringify(this.data));
}
