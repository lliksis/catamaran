import type { PlatformErrorCodes, ServerResponse } from "bungie-api-ts/core";

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
