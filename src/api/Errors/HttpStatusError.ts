export class HttpStatusError extends Error {
    code: number;
    constructor(response: Response) {
        super(response.statusText);
        this.code = response.status;
    }
}
