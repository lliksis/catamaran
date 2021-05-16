/**
 * An extended error class to describe exceptions from fetches.
 */
export class HttpStatusError extends Error {
    code: number;
    constructor(response: Response) {
        super(response.statusText);
        this.code = response.status;
        this.name = "HttpError";
    }
}
