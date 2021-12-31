import type { PlatformErrorCodes, ServerResponse } from "bungie-api-ts/core";

/**
 * An extended error class to describe exceptions from the api.
 */
export class BungieError extends Error {
    code: PlatformErrorCodes;
    status: string;
    constructor(props: IBungieErrorProps<any>) {
        super(props.Message);
        this.name = "BungieError";
        this.code = props.ErrorCode;
        this.status = props.ErrorStatus;
    }
}

export interface IBungieErrorProps<T> {
    Message: ServerResponse<T>["Message"];
    ErrorCode: ServerResponse<T>["ErrorCode"];
    ErrorStatus: ServerResponse<T>["ErrorStatus"];
}

export interface BungieError {
    code: PlatformErrorCodes;
    status: string;
    name: string;
}
