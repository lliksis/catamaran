import { BungieError, HttpStatusError } from "api/Errors";
import {
    HttpClientConfig,
    PlatformErrorCodes,
    ServerResponse,
} from "bungie-api-ts/destiny2";

/**
 * Creates a fetch method for the bungiet-api-ts api
 * @returns The fetch method
 */
export const createFetch = () => {
    return async (config: HttpClientConfig) => {
        let url = config.url;
        if (config.params) {
            url += `?${new URLSearchParams(config.params)}`;
        }

        const headers = {};
        headers["X-API-Key"] = process.env.X_API_KEY;
        if (config.body) {
            headers["Content-Type"] = "application/json";
        }

        const request = new Request(url, {
            method: config.method,
            body: config.body ? JSON.stringify(config.body) : undefined,
            headers,
        });

        const response = await fetch(request);

        // Throw an error if the response wasn't successfull.
        if (response.status < 200 || response.status >= 400) {
            throw new HttpStatusError(response);
        }

        const data: ServerResponse<unknown> = await response.json();
        // Throw an error if Bungies ServerResponse is not successfull.
        // There's an alternate error response that can be returned during maintenance
        const eMessage =
            data && (data as any).error && (data as any).error_description;
        if (eMessage) {
            throw new BungieError({
                Message: eMessage,
                ErrorCode: PlatformErrorCodes.DestinyUnexpectedError,
                ErrorStatus: eMessage,
            });
        } else if (data.ErrorCode !== PlatformErrorCodes.Success) {
            throw new BungieError(data);
        }

        return data;
    };
};
